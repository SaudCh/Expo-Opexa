const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
})
const { Expo } = require('expo-server-sdk');


admin.initializeApp();

const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET

exports.postRequest = functions.https.onRequest(async (request, response) => {

    response.json({ statusCode: 200, body: request.body })
})

exports.paymentIntent = functions.https.onRequest(async (request, response) => {

    const {
        amount,
        currency,
        receipt_email,
        receipt_name,
        description,
        uid
    } = request.body;

    try {

        const customers = await stripe.customers.list({
            email: receipt_email
        });

        let customer = null;

        if (customers.data.length > 0) {
            customer = customers.data[0];
        } else {
            customer = await stripe.customers.create({
                email: receipt_email,
                name: receipt_name
            });
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2022-11-15' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency ? currency : 'usd',
            customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: receipt_email,
            description: description,
        });

        admin.firestore().collection('payments').doc(paymentIntent.id).set({
            amount: parseFloat(amount).toFixed(2) / 100,
            currency: currency ? currency : 'usd',
            email: receipt_email,
            uid,
            description,
            status: 'created',
            method: 'card',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            userRef: admin.firestore().collection('users').doc(uid),
            paymentId: randomText(6),
            customer: customer.id,
            clientSecret: paymentIntent.client_secret,
        }).then(writeResult => {
            response.json({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id
            });
        })


    } catch (error) {
        response.status(400).json({ statusCode: 500, message: error.message })
    }
})

exports.events = functions.https.onRequest(async (req, res) => {

    let signature = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody, // req.body will cause an error
            signature,
            stripeSigningSecret
        );

        let paymentIntent = null;
        switch (event.type) {
            case "payment_intent.created":
                paymentIntent = event.data.object;
                functions.logger.log("Payment Intent Created", paymentIntent.id);
                break;
            case "payment_intent.succeeded":
                paymentIntent = event.data.object;

                const { amount_received, id } = paymentIntent;

                const amount = parseFloat(amount_received).toFixed(2) / 100

                // admin.firestore().collection('webhook').add(paymentIntent)

                const userRef = await admin.firestore().collection('payments').doc(id).get()

                const user = userRef.data()

                if (userRef.data()) {
                    await admin.firestore().collection('wallet').doc(user.uid).update({
                        balance: admin.firestore.FieldValue.increment(amount)
                    })

                    await admin.firestore().collection('payments').doc(id).update({
                        status: 'succeeded',
                        amountReceived: parseFloat(amount).toFixed(2) / 100
                    })

                }


                break;
            case "payment_intent.canceled":
                paymentIntent = event.data.object;
                functions.logger.log("Payment Intent Cancelled", paymentIntent.id);
                break;
            default:
                functions.logger.log("Unhandled event type", event.type);
                break;
        }

        res.send();
    } catch (error) {
        throw new functions.https.HttpsError(
            "unknown",
            `Error constructing Stripe event: ${error}`
        );
    }

})


exports.Notifications = functions.https.onRequest(async (request, response) => {

    const {
        uid,
        title,
        body,
        type,
        data,
        sendNoti
    } = request.body;

    try {
        const allTokens = await admin.firestore().collection('devices').where('uid', '==', uid).get()

        const db = admin.firestore();

        const docRef = await db.collection('notifications').add({
            uid,
            title,
            body,
            type,
            data
        });

        if (!sendNoti) {
            response.json({
                statusCode: 200,
                message: 'Notification sent 01',
            })
            return
        }

        let tokens = []
        allTokens.forEach((tokenDoc) => {
            if (tokenDoc.exists) {
                const docData = tokenDoc.data();
                tokens.push(docData.token)
            }
        });

        const expo = new Expo();

        const messages = tokens.map(token => ({
            to: token,
            sound: 'default',
            title,
            body,
        }));

        const chunks = expo.chunkPushNotifications(messages);

        const sendPromises = chunks.map(chunk => expo.sendPushNotificationsAsync(chunk));

        const results = await Promise.all(sendPromises);

        for (const result of results) {
            if (result.status === 'ok') {
                console.log('Notification sent successfully');
            } else {
                console.error(`Failed to send notification: ${result.message}`);
            }
        }

        response.json({
            statusCode: 200,
            message: 'Notification sent 02',
        })

    } catch (error) {
        response.status(400).json({ statusCode: 500, message: error.message })
    }
})

const randomText = (length = 6) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
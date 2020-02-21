console.log('UWU');

//const config = {iceServers: [{urls: "stun:stun.l.google.com:19302"}]};
//const config = {iceServers: [{urls: "stun:localhost:41234"}]};
const config = {};

const rtc = new RTCPeerConnection(config);
const rtc2 = new RTCPeerConnection(config);

rtc.createOffer().then(offer => {
    console.log(offer);

    rtc.setLocalDescription(offer).then(() => {

        console.log(0);

        rtc2.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
            console.log(1);

            rtc2.createAnswer().then((answer) => {
                console.log(2);

                rtc2.setLocalDescription(answer).then(() => {

                    console.log(3);
                    console.log(answer);
     
                    rtc.setRemoteDescription(new RTCSessionDescription(answer)).then(() => {
                        console.log(4);



                        const dataChannelOptions = {
                            ordered: true, // do not guarantee order
                            maxPacketLifeTime: 3000, // in milliseconds
                        };

                        const dataChannel1 = rtc.createDataChannel('test', dataChannelOptions);
                        dataChannel1.onerror = (error) => {
                            console.log("Data Channel Error:", error);
                        };

                        dataChannel1.onmessage = (event) => {
                            console.log("Got Data Channel Message:", event.data);
                        };

                        dataChannel1.onopen = () => {
                            dataChannel1.send("Hello World!");
                        };

                        dataChannel1.onclose = () => {
                            console.log("The Data Channel is Closed");
                        };






                        const dataChannel2 = rtc2.createDataChannel('test', dataChannelOptions);
                        dataChannel2.onerror = (error) => {
                            console.log("Data Channel Error:", error);
                        };

                        dataChannel2.onmessage = (event) => {
                            console.log("Got Data Channel Message:", event.data);
                        };

                        dataChannel2.onopen = () => {
                            console.log('eeeee');

                            dataChannel2.send("Hello World!");
                        };

                        dataChannel2.onclose = () => {
                            console.log("The Data Channel is Closed");
                        };


                    });
                });
            });
        });
    }); 
});

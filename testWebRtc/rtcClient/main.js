console.log('UWU');

//const config = {iceServers: [{urls: "stun:stun.l.google.com:19302"}]};
const config = {iceServers: [{urls: "stun:localhost:41234"}]};

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
                    });
                });
            });
        });
    }); 
});

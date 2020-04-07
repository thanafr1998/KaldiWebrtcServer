<template>
    <div class="d-flex">
            <div id="output" class='d-flex justify-content-left mr-2 width-100'>
                <span v-for="(msg, i) in transcriptionOutput" :key="i">{{msg}}</span>
            </div>
            <div class='d-flex mr-2'>
                <button class="btn btn-success" id="start" v-if="statusField==='START'" @click="start()">{{statusField}}</button>
                <button class="btn btn-danger" id="stop" v-if="statusField!=='START'" @click="stop()">{{statusField}}</button>
            </div>
    </div>
</template>

<script>
export default {
  name: 'Recognitor',
  data: function() {
      return {
          pc: null,
          dc: null,
          dcInterval: null,
          statusField: 'START',
          transcriptionOutput: [],
          lastTrans: '',
          imcompleteTrans: '',
      }
  },
  methods: {
    negotiate: function() {
        console.log('negotiate');
        return this.pc.createOffer().then(offer => {
        return this.pc.setLocalDescription(offer);
        }).then(() => {
            return new Promise( resolve => {
                if (this.pc.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    let checkState = () => {
                        if (this.pc.iceGatheringState === 'complete') {
                            this.pc.removeEventListener('icegatheringstatechange', checkState);
                            resolve();
                        }
                    }

                    this.pc.addEventListener('icegatheringstatechange', checkState);
                }
            });
        }).then(() => {
            var offer = this.pc.localDescription;
            console.log(offer.sdp);
            return fetch( process.env.VUE_APP_API + '/offer', {
                body: JSON.stringify({
                    sdp: offer.sdp,
                    type: offer.type,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });
        }).then(response => {
            return response.json();
        }).then(answer => {
            console.log(answer.sdp);
            return this.pc.setRemoteDescription(answer);
        }).catch(e => {
            console.log(e);
            this.statusField = "START";
        });
    },
    start: function() {
        this.statusField = 'Connecting...';

        var config = {
            sdpSemantics: 'unified-plan'
        };

        this.pc = new RTCPeerConnection(config);
        var parameters = {};

        this.dc = this.pc.createDataChannel('chat', parameters);
        this.dc.onclose = () => {
            clearInterval(this.dcInterval);
            console.log('Closed data channel');
            this.statusField = "START";
        };
        this.dc.onopen = () => {
            console.log('Opened data channel');
        };
        this.dc.onmessage = evt => {
            this.statusField = 'Listening...';
            var msg = evt.data;
            if (msg.endsWith('\n')) {
                this.lastTrans = this.imcompleteTrans + msg.substring(0, msg.length - 1);
                this.transcriptionOutput.push(this.lastTrans);
                this.imcompleteTrans = '';

            } else if (msg.endsWith('\r')) {
                this.lastTrans = this.imcompleteTrans + msg.substring(0, msg.length - 1) + '...';
                this.imcompleteTrans = '';
            } else {
                this.imcompleteTrans += msg;
            }
        };

        this.pc.oniceconnectionstatechange = () => {
            if (this.pc.iceConnectionState == 'disconnected') {
                console.log('Disconnected');
                this.statusField = "START";
            }
        }

        var constraints = {
            audio: true,
            video: false
        };

        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            stream.getTracks().forEach(track => {
                this.pc.addTrack(track, stream);
            });
            return this.negotiate();
        }, err => {
            console.log('Could not acquire media: ' + err);
            this.statusField = "START";
        });
    },
    stop: function() {
        // close data channel
        if (this.dc) {
            this.dc.close();
        }

        // close transceivers
        if (this.pc.getTransceivers) {
            this.pc.getTransceivers().forEach((transceiver) => {
                if (transceiver.stop) {
                    transceiver.stop();
                }
            });
        }

        // close local audio / video
        this.pc.getSenders().forEach((sender) => {
            sender.track.stop();
        });

        // close peer connection
        setTimeout(() => {
            this.pc.close();
        }, 500);
    }
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera, getCameraDevice } from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { utils } from '@react-native-firebase/app';

const rh = Dimensions.get('window').height;
const rw = Dimensions.get('window').width;

export default class RecordScreen extends Component {
  constructor(props) {
    super(props);
    this.camera = React.createRef();
    this.state = {
      isRecording: false,
      recordingDuration: 0,
      fullName: '',
    };
  }

  async componentDidMount() {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    const devices = Camera.getAvailableCameraDevices();
    const device = getCameraDevice(devices, 'front', {
      physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera'],
    });
    if (device == null) return <NoCameraDeviceError />;
    this.fetchUserData();
  }

  fetchUserData = () => {
    const user = auth().currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = firestore().collection('users').doc(uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          this.setState({
            fullName: userData.fullName,
          });
        } else {
          console.log('No such document!');
        }
      });
    }
  };

  handleStartRecording = async () => {
    try {
      await this.camera.current.startRecording({
        quality: '720p',
        maxDuration: 60,
        onRecordingError: (error) => {
          console.error('Recording error:', error);
        },
        onRecordingFinished: (video) => {
          console.log('Recording finished:', video);
          console.log('video path is ', video.path);
          this.uploadToFirebase(video.path);
        },
      });
      this.setState({ isRecording: true });
      this.startRecordingTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  handleStopRecording = async () => {
    try {
      const result = await this.camera.current.stopRecording();
      this.setState({ isRecording: false, recordingDuration: 0 });
      this.stopRecordingTimer();
      this.props.navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  startRecordingTimer = () => {
    this.recordingInterval = setInterval(() => {
      this.setState((prevState) => ({ recordingDuration: prevState.recordingDuration + 1 }));
      if (this.state.recordingDuration >= 60) {
        this.handleStopRecording();
      }
    }, 1000);
  };

  stopRecordingTimer = () => {
    clearInterval(this.recordingInterval);
  };
  
  // uploadToFirebase = async (videoPath) => {
  //   try {
  //     const storageRef = storage().ref();
  //     const fullName = this.state.fullName.replace(/\s+/g, '');
  //     const currentDate = new Date().toISOString().slice(0, 10);
  //     const reviewID = this.props.route.params.reviewID;

  //     // Update the video details in Firestore with the review ID
  //     const videoDetails = {
  //       name: this.state.fullName,
  //       date: new Date().toISOString().slice(0, 10),
  //       reviewID,
  //     };

  //     const videoFileName = `reviews-videos/${fullName}_${currentDate}.mp4`;

  //     const response = await storageRef.child(videoFileName).putFile(videoPath);
  //     await firestore().collection('videos').add(videoDetails);
  //     console.log('Video uploaded successfully:', response);
  //   } catch (error) {
  //     console.error('Error uploading video to Firebase Storage:', error);
  //   }
  // };
  uploadToFirebase = async (videoPath) => {
    try {
      const storageRef = storage().ref();
      const fullName = this.state.fullName.replace(/\s+/g, '');
      const currentDate = new Date().toISOString().slice(0, 10);
      const reviewID = this.props.route.params.reviewID;
  
      const videoFileName = `reviews-videos/${fullName}_${currentDate}.mp4`;
      const videoRef = storageRef.child(videoFileName);
  
      const response = await videoRef.putFile(videoPath);
      const downloadURL = await videoRef.getDownloadURL();
  
      // Update the video details in Firestore with the review ID and download URL
      const videoDetails = {
        name: this.state.fullName,
        date: new Date().toISOString().slice(0, 10),
        reviewID,
        downloadURL,
      };
  
      await firestore().collection('videos').add(videoDetails);
      console.log('Video uploaded successfully:', response);
      {Alert.alert('Success', 'Review submitted successfully!')}
    } catch (error) {
      console.error('Error uploading video to Firebase Storage:', error);
    }
  };
  

  render() {
    const devices = Camera.getAvailableCameraDevices();
    const device = getCameraDevice(devices, 'front', {
      physicalDevices: ['ultra-wide-angle-camera', 'wide-angle-camera', 'telephoto-camera'],
    });
    if (device == null) return <NoCameraDeviceError />;

    return (
      <View>
        <Camera
          ref={this.camera}
          style={styles.camera}
          device={device}
          isActive={true}
          video={true}
          audio={true}
        />
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{this.state.recordingDuration}s</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.handleStartRecording}>
            <Text style={{ fontSize: 25, color: 'white' }}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.handleStopRecording}>
            <Text style={{ fontSize: 25, color: 'white' }}>Stop & Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    height: rh * 0.8,
    width: rw * 1.2,
  },
  timerContainer: {
    position: 'absolute',
    top: rw * 0.05,
    right: rw * 0.05,
  },
  timerText: {
    fontSize: 20,
    color: 'white',
  },
  btnContainer: {
    backgroundColor: 'grey',
    height: rh * 0.2,
    width: rw,
    flexDirection: 'row',
  },
  btn: {
    width: rw * 0.3,
    height: rh * 0.1,
    backgroundColor: 'black',
    borderRadius: 10,
    margin: rw * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

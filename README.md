
Real-Time Manipulation Technique for Web Applications
over Wi-Fi Using Smartphone
P. Michálek
Abstract— This paper presents overview and demonstration of using mobile devices (smartphones) as easy-to-use controllers. Widespread (even cheap) smartphones provide sensors and connectability that could be used as controllers for wide variety of use-cases such as wireless handling computers for the purpose of designing, entertaining or work tasks. Smartphones are ready to provide whole bunch of sensor data, that could be streamed to network over wi-fi using UDP network protocol. These real-time data are preprocessed in device to ensure minimal bandwidth, then sent to specific location in the network. There are many potential applications for this approach, considering also possibility to theoretically connect illimitable number of devices. This can be useful in public places or team-building activities, where many people can participate on creative or entertaining activity resulting in spontaneous social interaction and intuitive cooperation.
KEYWORDS
smartphone, real-time remote control, wi-fi

I.	INTRODUCTION

UNDREDS of millions of smartphones have been sold since their introduction in 2007. Today’s mobile devices are possessing high computational power and microelectromechanical systems (sensors) on board. These properties contribute to the user experience by on-device adaptations, supporting useful applications and more. Developers have used these sensors to tailor them also for use in remote control.
The use of interaction techniques adds considerable value to users of multimedia products such as computers, tablets, smartphones, smart televisions, information panels, etc. Users are assumed as non-professionals in handling complicated tasks, therefore it is necessary to ensure that the manipulation with specific application is not only efficient but also intuitive and easy to learn [1]. Gesture interaction seems to be promising approach to enable users control variety of devices, appliances and applications instead of dedicated controllers for home displays or touch sensors for public displays. Techniques for using mobile devices as universal controllers are considered as usable since they fulfilled the requirements such as portability, accessibility, efficiency, maintenance, intuitiveness, and sanitation [2].  The main goal is to utilize as many sensor resources as offered by mobile devices in reasonable way in order to support multimodal control.
Researchers at the University of South Florida demonstrated tele-operated smartphone control of the most popular military UGV, the iRobot PackBot [4]. The same commercially done hobbyist quadcopters or AR.Drone (by the Parrot company). Using an ad hoc wireless connection, the smartphones acts as both controller and video screen. Their interface support both tilt inputs and buttons to maneuver .the quadcopter. Tilt control has a number of advantages: 1) it’s more intuitive for users, 2) it permits one-handed operation, 3) it requires less attention (i.e. looking in the screen) [4].
Touchscreen interfaces have been around long enough for basic heuristics to exist regarding button size, spacing, and menu display [6]. However, few heuristics exist defining use of the device’s sensors e.g. accelerometers and gyroscopes. Apple provides a strong set of guidelines in their iPhone Human Interface Guidelines, but states only that developers should consider accelerometer values as they pertain to device orientation [5].
Initial feedback from a small subset of users indicates that accelerometer control is feasible in tele-operated unmanned
ground systems just like in computer simulations; however, there are some design issues that merit further consideration, e.g. accelerometer sensitivity. Individual operators have different expectations for how a small movement should translate to vehicle motion; therefore, formal testing should include a readily-available interface to adjust the sensitivity setting. [4]
	This paper presents various intuitive and efficient manipulation techniques for web application in which mobile devices are used as multimodal controllers. The techniques enables users to handle demo web game application from multiple devices.

II.	BACKGROUND
A.	Sensors
Sensor is a way to sense the world and interpret the sensed information to the data form of the virtual world. If the sensors are used to detect gestures, some interesting applications may appear. As Figure 1 shows, modern smartphones have several kinds of sensors. The most popular sensors which most smartphones have are accelerometer, gyroscope, magnetometer, microphone, and camera. Table 1 summarizes the sensors that are supported by the Android platform.
a) Accelerometers are sensitive to small vibrations. A significant amount of jitter is caused by natural hand vibrations. Furthermore, the accelerometer itself has measurement errors. It is necessary to smooth this background vibration (noise) in order to extract jitter-free gestures. The phone’s displacement  is computed as a double integral of acceleration. However, due to errors in the accelerometer, the cumulative acceleration and deceleration values may not sum to zero even after the phone has come to rest. In order to reduce velocity-drift errors, the velocity to zero at some identifiable points needs to be reset [7].
b) Gyroscope is a device for measuring or maintaining orientation, based on the principles of angular momentum. Accelerometer is good at measuring the displacement of an object; however, it is inaccurate to measure the spin movement of the device, which is an easy thing for gyroscope. Gyroscope is a very sensitive device. It is good at detecting the spin movement. Same as accelerometer, gyroscope returns three-dimensional values.
c) Microphone is a very common sensor; it is usually used for recording sound. The problem is how to deal with the recorded sound. The most common way is to find a known period of sound in a sound record [7].
d) Camera captures vision information from real world. From the human perspective, vision contains most information we get. However, pattern recognition in computer area is not mature enough to work as human does.
e)  Proximity sensor is a sensor able to detect the presence of nearby objects without any physical contact. A proximity sensor often emits an electromagnetic field or a beam of electromagnetic radiation (infrared, for instance), and looks for changes in the field or return signal. [8]

B.	Network
Wi-Fi was designed as a local-area access network, in urban environments, the Wi-Fi mesh frequently supplements a number of existing access technologies, including wired broadband networks, 3G cellular, and commercial Wi-Fi hotspots [10].
With UDP, applications can send messages, in this case referred to as datagrams, to other hosts on an Internet Protocol (IP) network without prior communications to set up special transmission channels or data paths. UDP is suitable for purposes where error checking and correction is either not necessary or is performed in the application, avoiding the overhead of such processing at the network interface level. Time-sensitive applications often use UDP because dropping packets is preferable to waiting for delayed packets, which may not be an option in a real-time system. [9].
	There is still problem with socket buffer overflow. Used technology has to handle this state, and also take action to ensure smooth user experience. A question is whether the number of processes may also have an influence on the socket overflow. However, with the assumption that overhead in context switching is disregarded, only 1 process
can be served even when there are N processes in the system and the kernel is in an idle state. Therefore, the number does not have an impact on the performance of the networking system. That is, when it comes to the service rate, the duration of the idle state is important, not the number of
processes. For this reason, the number of processes is
excluded as a factor
III.	SOLUTION
We are presenting concept of technology that simplify process of smartphone-computer cooperation in order to use smartphone as controller. Sockets have traditionally been the solution around which most real-time systems are architected, providing a bi-directional communication channel between a client and a server.

A.	Controller - Smartphone application
Smartphone is connected to the network over Wi-Fi and runs the application capable of streaming sensor data over network. The prototype is made on Android platform (Fig.2.), but since we are using common UDP transport protocol it is possible to connect to the server socket through any device and even parallel. The application is sending data to the network in XML document format every 100ms. We tested method with more than one device to control web application and we did not observed any performance issues. The reason is that this streams are not able to fully utilize home network bandwidth, and Socket.IO engine, which process incoming messages, is handling this streams in separate asynchronous thread.

B.	Localhost server - Node.JS
Node.js makes concurrent programming a non-issue by removing all concurrency in actual application code and making all "system" calls asynchronous. No need to think about thread-pools, locking, deadlocks or the treacherous Java Memory Model.
The first goal was to setup a simple HTML webpage that serves out a list of messages from smartphones sensors. We used the Node.JS web server. In our experiments we observed data transfer rate between 1kB/s to 10kB/s, depending on a) the number of data from sensors (1-12) since we don’t necessarily need all data from every sensor b) sensor refresh rate, which can be various and sometimes tricky. To ensure smooth and real-time user experience, it is required to lower the response delay to minimum. There have to be found balance between this and effective network stream utilization. We experimented with 1ms to 1000ms refresh rate. After couple of experiments we chose fixed sampling rate 100ms. Impact of fixed sampling rate on receiving socket is discussed in the section III.C. Socket.IO. As data structure we used XML document format to simplify data processing on server-side application component. Methods based on common standards are easier to integrate into existing technology such as web application.
Properly configured socket for incoming network UDP stream is shown in following simplified code snippet:

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var mysocket = 0;
app.listen(8080);
io.sockets.on('connection', function (socket) {
console.log('index.html connected');
mysocket = socket;
});
// udp server on 4711
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
if (mysocket != 0) {
mysocket.emit('field', "" + msg);
mysocket.broadcast.emit('field', "" + msg);
}
});
server.on("listening", function () {
var address = server.address();
console.log("udp server listening "
+ address.address + ":" + address.port);
});
server.bind(4711);


Fig. 2. Smartphone application streaming sensor data

As io.sockets.emit shows, all messages received on the UDP port 4711 are sent to all connected clients (HTTP web server on port 8080). Thanks to this script we are able to asynchronously income real-time stream of messages in web application. Details about real-time processing are described in following section.

C.	Socket.IO
Socket.IO allows you to send messages between your browser client and your node.js server, both ways. Socket.IO is composed of two parts: [11]
a) server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
b) client library that loads on the browser side: socket.io-client.
A bound datagram socket keeps the node process running to receive datagrams. Data streams from multiple sockets are thus processed by this one server socket in asynchronous thread.
There is still problem in case of socket buffer overflow since server in current prototype is not monitoring network protocol statistics. Method is therefore missing feedback control loop to dynamically adjust sensor data sampling rate while experiencing buffer overflow. Messages received while full buffer are dropped, therefore we are losing control. Fortunately, Socket.IO is configurable and is able to change buffer sizes, so we are at least able to ensure smoothness required by certain application.

D.	Presentation layer – Driving game
Real-time utilization was tested on car driving game in Google Chrome browser (Fig.3). Simple game can be controlled by various sensors in smartphone. To accelerate user have to tilt smartphone a little forward. The steering is similar tilt movement on sides. This is possible thanks to gravity sensor measuring in 3 different axis. The proximity sensor was utilized to work as a handbrake. So, when a hand is placed over smartphone, the car will immediately start breaking. To show how real environment can affect virtual reality, we used light intensity sensor to real-time adjust range of view.



Fig. 3. Driving game with adjusted view range

IV.	CONCLUSION
We have successfully implemented and tested wireless real-time manipulation method for web application using smartphone as controller with various sensors. The solution can receive data from multiple devices at the same time, and process them in Node.JS application server. Real-time network engine Socket.IO provided useful methods for receiving network messages.
Method is still missing feedback control loop to dynamically adjust sensor data sampling rate while experiencing buffer overflow on server socket.
REFERENCES
[1]	YOON, Dongwook, et al. Mobiature: 3d model manipulation technique for large displays using mobile devices. In: Consumer Electronics (ICCE), 2011 IEEE International Conference on. IEEE, 2011. p. 495-496.
[2]	BALLAGAS, Rafael; ROHS, Michael; SHERIDAN, Jennifer G. Mobile Phones as Pointing Devices. In: PERMID. 2005. p. 27-30.
[3]	LIAN, Kuang-Yow; HSIAO, Sung-Jung; SUNG, Wen-Tsai. Intelligent multi-sensor control system based on innovative technology integration via ZigBee and Wi-Fi networks. Journal of Network and Computer Applications, 2013, 36.2: 756-767.
[4]	WALKER, Amber M.; MILLER, David P. Tele-operated robot control using attitude aware smartphones. In: Human-Robot Interaction (HRI), 2012 7th ACM/IEEE International Conference on. IEEE, 2012. p. 269-270.
[5]	Apple. iPhone Human Interface Guidelines, OCT 2011.
[6]	A. Smith. Pushing the right buttons: Design characteristics of touch screen buttons. Usability News, 11(2), 2009.
[7]	LIU, Ming. A study of mobile sensing using smartphones. International Journal of Distributed Sensor Networks, 2013, 2013.
[8]	LEE, Hyung-Kew; CHANG, Sun-Il; YOON, Euisik. A capacitive proximity sensor in dual implementation with tactile imaging capability on a single flexible platform for robot assistant applications. In: Micro Electro Mechanical Systems, 2006. MEMS 2006 Istanbul. 19th IEEE International Conference on. IEEE, 2006. p. 606-609.
[9]	Kurose, J. F.; Ross, K. W. (2010). Computer Networking: A Top-Down Approach (5th ed.). Boston, MA: Pearson Education. ISBN 978-0-13-136548-3.
[10]	AFANASYEV, Mikhail, et al. Analysis of a mixed-use urban wifi network: when metropolitan becomes neapolitan. In: Proceedings of the 8th ACM SIGCOMM conference on Internet measurement. ACM, 2008. p. 85-98.
[11]	http://socket.io/docs/
[12]


Javascript Pseudo 3D Racer
___________________________

An Outrun-style pseudo-3d racing game in HTML5 and Javascript

 * [play the game](http://codeincomplete.com/projects/racer/v4.final.html)
 * view the [source](https://github.com/jakesgordon/javascript-racer)
 * read about [how it works](http://codeincomplete.com/posts/2012/6/22/javascript_racer/)

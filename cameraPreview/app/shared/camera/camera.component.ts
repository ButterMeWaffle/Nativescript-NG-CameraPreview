import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import permissions = require('nativescript-permissions');
import placeholder = require("ui/placeholder");
import placeholderModule = require("ui/placeholder");
import { Page } from "ui/page";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions'
import platformModule = require("platform");
import application = require("application");
import app = require('application');
import utils = require("utils/utils");
import fs = require("file-system");
declare var android; // declare andfroid so you have access to .camera2 ** this is very important!*
//@Interfaces([android.view.TextureView.SurfaceTextureListener])
//declare var record;
//declare var options;
//declare var java;


@Component({
    selector: "Camera",
    templateUrl: "shared/camera/camera.html",
    styleUrls: ["shared/camera/camera-common.css"]
})
// if (platformModule.isAndroid) {
@Injectable()   // this alows the compoennt to be exported for use in other pages
export class Camera extends java.lang.Object implements OnInit, android.view.TextureView.SurfaceTextureListener {
   
    public args: placeholder.CreateViewEventData; // define what args will be, **NOT SETTING ANY VALUES**
    
    public output;
    public init: boolean = false;
    public height: any;
    public width: any;
    //@ViewChild(placeholder) public Placeholder: placeholder;
    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        super();
        //camera.requestPermissions();
        
       
        this.height = platformModule.screen.mainScreen.heightPixels;
        this.width = platformModule.screen.mainScreen.widthPixels;
        console.log("Screen height from Camera Module: " + platformModule.screen.mainScreen.heightPixels);
        //if (classesRef.app.android) {
        //    var mCameraId;
        //    var mCaptureSession;
        //    var mCameraDevice;
        //    var mStateCallBack;
        //    var mBackgroundHandler = null;
        //    var mCameraOpenCloseLock = new java.util.concurrent.Semaphore(1);
        //    var mTextureView;
        //    var mSurfaceTexture;
        //    var mPreviewRequestBuilder;
        //    var mPreviewRequest;
        //    var mImageReader;
        //    var mCaptureCallback;
        //    var mFile;
        //}                
        application.on(application.suspendEvent, (args: application.ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
                if (classesRef.mCameraDevice !== null) {
                    classesRef.mCameraDevice.close();
                    classesRef.mCameraDevice = null;
                }
                classesRef.mCameraOpenCloseLock.release();
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application.on(application.resumeEvent, (args: application.ApplicationEventData) => {
            if (args.android) {
                console.log('on resume');
                //this.drawerComponent.navTo('home');
                this.routerExtensions.back();
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                console.log('on resume');
                //this.drawerComponent.navTo('home');
                this.routerExtensions.back();
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
    }
    public closeCamera = () => {
        classesRef.mCameraDevice.close();
        classesRef.mCameraDevice = null;
        classesRef.mCameraOpenCloseLock.release();
    }
    public checkCamera = () => {
        var isActive;
        if (classesRef.mCameraDevice == null) {
            isActive = false;
        } else {
            isActive = true;
        }
        console.log(isActive)
        return isActive;
    }
    public goBack() {
        
        classesRef.mCameraDevice.close();
        if (classesRef.mCameraDevice == null) {
            classesRef.mCameraDevice = null;
        }
        classesRef.mCameraOpenCloseLock.release();
        
    }

    //public takeVideo = () => {
    //    var mMediaRecorder = new MediaRecorder();
        
    //    //android.content.Intent takeVideoIntent = new android.content.Intent(MediaStore.ACTION_VIDEO_CAPTURE);
    //    //if (takeVideoIntent.resolveActivity(getPackageManager()) != null) {
    //    //    startActivityForResult(takeVideoIntent, classesRef.REQUEST_VIDEO_CAPTURE);
            
    //    //}
    //}
    public test = () => {
        
    }

    public initRecorder = () => {
    classesRef.mMediaRecorder.setAudioSource(android.media.MediaRecorder.AudioSource.DEFAULT);
    classesRef.mMediaRecorder.setVideoSource(android.media.MediaRecorder.VideoSource.DEFAULT);
    
    var cpHigh = android.media.CamcorderProfile
        .get(android.media.CamcorderProfile.QUALITY_HIGH);
        classesRef.mMediaRecorder.setProfile(cpHigh);
        classesRef.mMediaRecorder.setOutputFile("/sdcard/videocapture_example.mp4");
        classesRef.mMediaRecorder.setMaxDuration(50000); // 50 seconds
        classesRef.mMediaRecorder.setMaxFileSize(5000000); // Approximately 5 megabytes
    }

    public takeVideo = (Intent: android.content.Intent) => {    // this does not work as of now
        console.log('test')
        //var mCamera = getCameraInstance();
        //mMediaRecorder = new MediaRecorder();

        // Step 1: Unlock and set camera to MediaRecorder
        classesRef.mCameraDevice.unlock();
        //classesRef.mMediaRecorder.setCamera(classesRef.mCameraDevice);

        //// Step 2: Set sources
        //classesRef.mMediaRecorder.setAudioSource(android.media.MediaRecorder.AudioSource.CAMCORDER);
        //classesRef.mMediaRecorder.setVideoSource(android.media.MediaRecorder.VideoSource.CAMERA);

        //// Step 3: Set a CamcorderProfile (requires API Level 8 or higher)
        //classesRef.mMediaRecorder.setProfile(android.media.CamcorderProfile.get(android.media.CamcorderProfile.QUALITY_HIGH));
        
        //// Step 4: Set output file
        //classesRef.mMediaRecorder.setOutputFile("/sdcard/videocapture_example.mp4");

        //// Step 5: Set the preview output
        //classesRef.mMediaRecorder.setPreviewDisplay(classesRef.mPreviewBuilder);

        // Step 6: Prepare configured MediaRecorder
        //try {
            //classesRef.mMediaRecorder.prepare();
        //} catch (IllegalStateException e) {
        //    console.log(TAG, "IllegalStateException preparing MediaRecorder: " + e.getMessage());
            
        //    classesRef.mMediaRecorder.release();
        //    return false;
        //} try (IOException e) {
        //    console.log(TAG, "IOException preparing MediaRecorder: " + e.getMessage());
        //    classesRef.mMediaRecorder.release();

        //}
        //classesRef.mMediaRecorder.start();
    }
    public onSurfaceTextureAvailable(texture, width, height) {

        console.log('onSurfaceTextureAvailable from public');
        classesRef.mSurfaceTexture = texture;
        console.log('classesRef.mSurfaceTexture-------------NOOO', classesRef.mSurfaceTexture);
        this.createCameraPreviewSession();
        //openCamera(width, height);
        
    }

    public onSurfaceTextureSizeChanged(texture, width, height) {
        console.log('onSurfaceTextureSizeChanged');
        // configureTransform(width, height);
    }

    public onSurfaceTextureDestroyed = (texture) => {
        // console.log("onSurfaceTextureDestroyed");
        return true;
    }

    public onSurfaceTextureUpdated = (texture) => {
         console.log("onSurfaceTexturUpdated");
     }
    ngOnInit() {
        
        this.init = true;
        this.height = platformModule.screen.mainScreen.heightPixels;
        //this.page.height = platformModule.screen.mainScreen.heightPixels;
        console.log('height ----',this.height)
    }
    
    public onLoaded = (args) => {
        console.log('1');
        //console.log(args.object);
        this.page = args.object;
        
    }

    public onTakeShot = (args) => {
        console.log('2');
        //if (classesRef.app.ios) {
        //    var videoConnection = classesRef.output.connections[0];
        //    classesRef.output.captureStillImageAsynchronouslyFromConnectionCompletionHandler(videoConnection, function (buffer, error) {
        //        var imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(buffer);
        //        var image = UIImage.imageWithData(imageData);
        //        UIImageWriteToSavedPhotosAlbum(image, null, null, null);
        //        AudioServicesPlaySystemSound(144);
        //    });
        //}
        //else
            if (classesRef.app.android) { // WAS else if, ios is commented out untill i get dependencies setup
            console.log("onTakeShot");
            this.lockFocus();
            // captureStillPicture(); // I added this!!!!!!//
        }
    }

    public lockFocus = () => {
        console.log("lockFocus");
        classesRef.mState = classesRef.STATE_WAITING_LOCK;
        classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler);
        console.log(classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler));
        //this.captureStillPicture();
    }

    public runPrecaptureSequence = () => {
        console.log('3')
        // This is how to tell the camera to trigger. 
        classesRef.mPreviewRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AE_PRECAPTURE_TRIGGER, android.hardware.camera2.CaptureRequest.CONTROL_AE_PRECAPTURE_TRIGGER_START);
        // Tell #mCaptureCallback to wait for the precapture sequence to be set.
        classesRef.mState = classesRef.STATE_WAITING_PRECAPTURE;
        classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler);
    }

    public captureStillPicture = () => {
        console.log('4')
        console.log('captureStillPicture');
        // This is the CaptureRequest.Builder that we use to take a picture.
        var captureBuilder = classesRef.mCameraDevice.createCaptureRequest(android.hardware.camera2.CameraDevice.TEMPLATE_STILL_CAPTURE);
        captureBuilder.addTarget(classesRef.mImageReader.getSurface());

        // Use the same AE and AF modes as the preview.
        captureBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_AUTO, android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
        classesRef.setAutoFlash(captureBuilder);

        var CaptureCallback = android.hardware.camera2.CameraCaptureSession.CaptureCallback.extend({
            onCaptureCompleted: (session, request, result) => {
                console.log("onCaptureCompleted");
                 console.log(result.toString());
            }
        });

        classesRef.mCaptureSession.stopRepeating();
        
        classesRef.mCaptureSession.capture(captureBuilder.build(), CaptureCallback, null);
    }

    public createCameraPreviewSession () {
        console.log('5')
        console.log("createCameraPreviewSession");
        //classesRef.mSurfaceTexture = android.graphics.SurfaceTexture();
        //classesRef.mSurfaceTexture = android.graphics.SurfaceTexture;
        //console.log(android.graphics.SurfaceTexture)
        if (!classesRef.mSurfaceTexture || !classesRef.mCameraDevice) {
            console.log('classesRef.mSurfaceTexture ----if --', classesRef.mSurfaceTexture);
            console.log('classesRef.mCameraDevice ----if --', classesRef.mCameraDevice);
            console.log(this.mSurfaceTextureListener); // was stopping here
            this.mSurfaceTextureListener; // HERE
            console.log('after onSurfaceTexture')
            return;
        } 
        console.log('classesRef.mSurfaceTexture ---- after--', classesRef.mSurfaceTexture);
        console.log('classesRef.mCameraDevice ---- after--', classesRef.mCameraDevice);
        var texture = classesRef.mTextureView.getSurfaceTexture();
        console.log('texture')
        console.log(texture)
        // We configure the size of default buffer to be the size of camera preview we want.
        texture.setDefaultBufferSize(800, 480); // breakPoint texture is null

        // This is the output Surface we need to start preview.
        var surface = new android.view.Surface(texture);

        // // We set up a CaptureRequest.Builder with the output Surface.
        classesRef.mPreviewRequestBuilder = classesRef.mCameraDevice.createCaptureRequest(android.hardware.camera2.CameraDevice.TEMPLATE_PREVIEW);
        classesRef.mPreviewRequestBuilder.addTarget(surface);
        var surfaceList = new java.util.ArrayList();
        surfaceList.add(surface);
        classesRef.mCameraDevice.createCaptureSession(surfaceList, new this.MyCameraCaptureSessionStateCallback(), null);
        //this.mSurfaceTextureListener;
    }

    public onCreatingView = (args: any) => {
        console.log('6') // first
        //if (classesRef.app.ios) {
        //    var session = new AVCaptureSession();
        //    session.sessionPreset = AVCaptureSessionPreset1280x720;

        //    // Adding capture device
        //    var device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
        //    var input = AVCaptureDeviceInput.deviceInputWithDeviceError(device);
        //    if (!input) {
        //        throw new Error("Error trying to open camera.");
        //    }
        //    session.addInput(input);

        //    classesRef.output = new AVCaptureStillImageOutput();
        //    session.addOutput(classesRef.output);

        //    session.startRunning();

        //    var videoLayer = AVCaptureVideoPreviewLayer.layerWithSession(session);

        //    var view = UIView.alloc().initWithFrame({ origin: { x: 0, y: 0 }, size: { width: 400, height: 600 } });
        //    videoLayer.frame = view.bounds;
        //    view.layer.addSublayer(videoLayer);
        //    args.view = view;

        //}
        //else
            if (classesRef.app.android) { // was else if
            var appContext = classesRef.app.android.context;
            var cameraManager = appContext.getSystemService(android.content.Context.CAMERA_SERVICE);
            var cameras = cameraManager.getCameraIdList();
            for (var index = 0; index < cameras.length; index++) {
                var currentCamera = cameras[index];
                var currentCameraSpecs = cameraManager.getCameraCharacteristics(currentCamera);

                // get available lenses and set the camera-type (front or back)
                var facing = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.LENS_FACING);
                
                if (facing !== null && facing == android.hardware.camera2.CameraCharacteristics.LENS_FACING_FRONT) { // was LENS_FACING_BACK
                    console.log("FRONT camera, was back");
                    this.onLoaded(args);
                    classesRef.mCameraId = currentCamera;
                }

                // get all available sizes and set the format
                var map = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
                var format = map.getOutputSizes(android.graphics.ImageFormat.JPEG);
                console.log("---Format:--- " + format + " " + format.length + " " + format[4]);

                // we are taking not the largest possible but some of the 5th in the list of resolutions
                if (format && format !== null) {
                    console.log('Formattt----',format[0])
                    var dimensions = format[5].toString().split('x');
                    var largestWidth = +dimensions[0];
                    var largestHeight = +dimensions[1];
                    
                    // set the output image characteristics
                    classesRef.mImageReader = new android.media.ImageReader.newInstance(largestWidth, largestHeight, android.graphics.ImageFormat.JPEG, /*maxImages*/2);
                    classesRef.mImageReader.setOnImageAvailableListener(this.mOnImageAvailableListener, classesRef.mBackgroundHandler);
                    console.log('here1')
                }
                
            }
            classesRef.mStateCallBack = new this.MyStateCallback(); 

            //API 23 runtime permission check
            if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.LOLLIPOP) {
                console.log("checking presmisions ....");
                if (android.support.v4.content.ContextCompat.checkSelfPermission(appContext, android.Manifest.permission.CAMERA) == android.content.pm.PackageManager.PERMISSION_GRANTED) {

                    console.log("Permison already granted!!!!!");
                    cameraManager.openCamera(classesRef.mCameraId, classesRef.mStateCallBack, classesRef.mBackgroundHandler);

                } else if (android.support.v4.content.ContextCompat.checkSelfPermission(appContext, android.Manifest.permission.CAMERA) == android.content.pm.PackageManager.PERMISSION_DENIED) {
                    console.log("NO PERMISIONS - about to try get them!!!"); // I am crashing here - wrong reference for shouldShowRequestPermissionRationale !?
                    
                     console.log(android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(appContext, android.Manifest.permission.CAMERA).toString());

                     if (android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(appContext, android.Manifest.permission.CAMERA)){
                         console.log("No Permission to use the Camera services");
                     }

                     // var stringArray = Array.create(java.lang.String, 1);
                     // stringArray[0] = android.Manifest.permission.CAMERA;
                     console.log("Permison is about to be granted!!!!");
                     //android.support.v4.app.ActivityCompat.requestPermissions(appContext, [], REQUEST_CAMERA_RESULT);
                }
            } else {
                cameraManager.openCamera(classesRef.mCameraId, classesRef.mStateCallBack, classesRef.mBackgroundHandler);
            }

            // cameraManager.openCamera(mCameraId, mStateCallBack, mBackgroundHandler);
            console.log('here - before break point')
            classesRef.mTextureView = new android.view.TextureView(classesRef.app.android.context);
            console.log(classesRef.mTextureView);
            console.log(args);
            console.log('after args and mTextureView logs, before break')
            classesRef.mTextureView.setSurfaceTextureListener(this.mSurfaceTextureListener); // the listener is populated, but the set is causing issues
            console.log('after break point')
            args.view = classesRef.mTextureView;
            //args.view.setAlpha(0.5); // make the camera view translucent

            console.log('-----',args.view);
        }
    }
    // from Java ; public static abstract class
    public MyCameraCaptureSessionStateCallback = android.hardware.camera2.CameraCaptureSession.StateCallback.extend({
        onConfigured: (cameraCaptureSession) => {
            console.log("onConfigured " + cameraCaptureSession);
            console.log('7');
            if (classesRef.mCameraDevice === null) {
                console.log('classesRef.mCameraDevice === null')
                return;
            }

            classesRef.mCaptureSession = cameraCaptureSession;
            // brakes here
            
            //classesRef.mPreviewRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE, android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
             // Flash is automatically enabled when necessary.
            //classesRef.setAutoFlash(classesRef.mPreviewRequestBuilder);

            // Finally, we start displaying the camera preview.
            classesRef.mPreviewRequest = classesRef.mPreviewRequestBuilder.build();
            classesRef.mCaptureSession.setRepeatingRequest(classesRef.mPreviewRequest, new this.MyCaptureSessionCaptureCallback, null);
            this.onSurfaceTextureUpdated;
        },
        onConfigureFailed: function (cameraCaptureSession) {
            console.log("onConfigureFailed " + cameraCaptureSession);
        }
    });

    // from Java : public static abstract class
    public MyCaptureSessionCaptureCallback = android.hardware.camera2.CameraCaptureSession.CaptureCallback.extend({
        //console.log('8');
        process: (result) => {
            switch (classesRef.mState) {
                case classesRef.STATE_PREVIEW: {
                    // We have nothing to do when the camera preview is working normally.
                    break;
                }
                case classesRef.STATE_WAITING_LOCK: {
                    var afState = result.get(android.hardware.camera2.CaptureResult.CONTROL_AF_STATE);
                    if (afState === null) {
                        this.captureStillPicture();
                    } else if (android.hardware.camera2.CaptureResult.CONTROL_AF_STATE_FOCUSED_LOCKED == afState ||
                        android.hardware.camera2.CaptureResult.CONTROL_AF_STATE_NOT_FOCUSED_LOCKED == afState) {
                        // CONTROL_AE_STATE can be null on some devices
                        var aeState = result.get(android.hardware.camera2.CaptureResult.CONTROL_AE_STATE);
                        if (aeState === null ||
                            aeState == android.hardware.camera2.CaptureResult.CONTROL_AE_STATE_CONVERGED) {
                            classesRef.mState = classesRef.STATE_PICTURE_TAKEN;
                            this.captureStillPicture();
                        } else {
                            this.runPrecaptureSequence();
                        }
                    }
                    break;
                }
                case classesRef.STATE_WAITING_PRECAPTURE: {
                    // CONTROL_AE_STATE can be null on some devices
                    var aeStatee = result.get(android.hardware.camera2.CaptureResult.CONTROL_AE_STATE);
                    if (aeStatee === null ||
                        aeStatee == android.hardware.camera2.CaptureResult.CONTROL_AE_STATE_PRECAPTURE ||
                        aeStatee == android.hardware.camera2.CaptureRequest.CONTROL_AE_STATE_FLASH_REQUIRED) {
                        classesRef.mState = classesRef.STATE_WAITING_NON_PRECAPTURE;
                    }
                    break;
                }
                case classesRef.STATE_WAITING_NON_PRECAPTURE: {
                    // CONTROL_AE_STATE can be null on some devices
                    var aeStateee = result.get(android.hardware.camera2.CaptureResult.CONTROL_AE_STATE);
                    if (aeStateee === null || aeStateee != android.hardware.camera2.CaptureResult.CONTROL_AE_STATE_PRECAPTURE) {
                        classesRef.mState = classesRef.STATE_PICTURE_TAKEN;
                        this.captureStillPicture();
                    }
                    break;
                }
            }
        },
        onCaptureProgressed: function (session, request, partialResult) {
            // console.log("onCaptureProgressed");
            this.process(partialResult);
        },
        onCaptureCompleted: function (session, request, result) {
             //console.log("onCaptureCompleted"); // repeats!!!!!
            this.process(result);
        },
        onCaptureFailed: function (session, request, failure) {
            // console.log("onCaptureFailed");
            console.log('failure', failure);
            //classesRef.mCameraDevice.close();
            classesRef.mCameraDevice = null;
            classesRef.mCameraOpenCloseLock.release();
            return
        }
    });

    // (example for: java static interface to javaScript )
    // from Java : public static interface    
    public mOnImageAvailableListener = new android.media.ImageReader.OnImageAvailableListener({
        onImageAvailable: (reader) => {
            console.log('9')
            // here we should save our image to file when image is available
            console.log("onImageAvailable");
            console.log('reader',reader);
        }
    });  
    
    
    public mSurfaceTextureListener = new android.view.TextureView.SurfaceTextureListener({
        onSurfaceTextureAvailable: (texture, width, height) => {
            console.log('10')
            classesRef.mSurfaceTexture = texture;
            console.log('classesRef.mSurfaceTexture -----mSurfaceTextureListener--', classesRef.mSurfaceTexture);
            this.createCameraPreviewSession();
            //this.onSurfaceTextureAvailable
        },

        onSurfaceTextureSizeChanged: (texture, width, height) => {
            console.log('11')
            //this.onSurfaceTextureSizeChanged
        },

        onSurfaceTextureDestroyed: (texture) => {
            console.log('12')
            return true;
            //this.onSurfaceTextureDestroyed
        },

        onSurfaceTextureUpdated: (texture) => {
            //console.log('13', texture); // should be repeating constantly
            //this.onSurfaceTextureUpdated
            // console.log("onSurfaceTexturUpdated");
        },

    });

    // from Java : public static interface    // WRONG ONE
    //public mSurfaceTextureListener = () => new android.view.TextureView.SurfaceTextureListener({

    //    onSurfaceTextureAvailable: (texture, width, height) => {
    //        console.log('onSurfaceTextureAvailable');
    //        classesRef.mSurfaceTexture = texture;
    //        console.log('classesRef.mSurfaceTexture-------------', classesRef.mSurfaceTexture);
    //        this.createCameraPreviewSession(); 
    //        // openCamera(width, height);
    //    },

    //    onSurfaceTextureSizeChanged: (texture, width, height) => {
    //        console.log('onSurfaceTextureSizeChanged');
    //        // configureTransform(width, height);
    //    },

    //    onSurfaceTextureDestroyed: (texture) => {
    //        // console.log("onSurfaceTextureDestroyed");
    //        return true;
    //    },

    //    onSurfaceTextureUpdated: (texture) => {
    //         console.log("onSurfaceTexturUpdated");
    //    },

    //});

    // from Java : public static abstract class
    public MyStateCallback = android.hardware.camera2.CameraDevice.StateCallback.extend({
        onOpened: (cameraDevice) => {
            console.log("onOpened " + cameraDevice);
            console.log('11')
            classesRef.mCameraOpenCloseLock.release();
            classesRef.mCameraDevice = cameraDevice;
            this.createCameraPreviewSession();
        },
        onDisconnected:  (cameraDevice) => {
            console.log("onDisconnected");

            classesRef.mCameraOpenCloseLock.release();
            cameraDevice.close();
            classesRef.mCameraDevice = null;
        },
        onError: (cameraDevice, error) => {
            console.log("onError");
            console.log("onError: device = " + cameraDevice);
            console.log("onError: error =  " + error);

            classesRef.mCameraOpenCloseLock.release();
            cameraDevice.close();
            classesRef.mCameraDevice = null;
        },
        onClosed: (cameraDevice) => {
            console.log("onClosed");
        }
    });
    
}
// } else if (platformModule.isIOS) {
//     @Injectable()   
//     export class Camera {
//         constructor(private page: Page) {
            
//         }
//     }
// }

export class classesRef {
    
    static app = require('application');
    static output;
    static mCameraId;
    static mCaptureSession;
    static mCameraDevice;
    static mStateCallBack;
    static mBackgroundHandler = null;
    static mCameraOpenCloseLock = new java.util.concurrent.Semaphore(1);
    static mTextureView;
    static mSurfaceTexture;
    static mPreviewRequestBuilder;
    static mPreviewRequest;
    static mImageReader;
    static mCaptureCallback;
    static mFile;
    static setAutoFlash
    static mCameraDeviceStateCallback;
    static RESULT_CANCELED = 0;
    static RESULT_OK = -1;
    static REQUEST_VIDEO_CAPTURE = 999;
    static REQUEST_CODE_ASK_PERMISSIONS = 1000;
    static ORIENTATION_UNKNOWN = -1;
    static PERMISSION_DENIED = -1;
    static PERMISSION_GRANTED = 0;
    static MARSHMALLOW = 23;
    static currentapiVersion = android.os.Build.VERSION.SDK_INT;
    static mMediaRecorder = new android.media.MediaRecorder();
    static mNextVideoAbsolutePath = fs.knownFolders.documents();
    static mRecorderSurface;
    static mPreviewBuilder;
    static surfaces;
    //static that = new WeakRef(this);

    static STATE_PREVIEW = 0;
    static STATE_WAITING_LOCK = 1;
    static STATE_WAITING_PRECAPTURE = 2;
    static STATE_WAITING_NON_PRECAPTURE = 3;
    static STATE_PICTURE_TAKEN = 4;
    static mState = classesRef.STATE_PREVIEW;

    
    constructor(private page: Page) {
    }
}

//export class TNSSurfaceTextureListner extends java.lang.Object implements android.view.TextureView.SurfaceTextureListener {
//    public that = new WeakRef(this);
//    public mSurfaceTextureListener = () => new android.view.TextureView.SurfaceTextureListener({
//        onSurfaceTextureAvailable: (texture, width, height) => {
//            console.log('onSurfaceTextureAvailable');
//            this.that.get().classesRef.mSurfaceTexture = texture;
//            console.log('classesRef.mSurfaceTexture-------------', that.get().classesRef.mSurfaceTexture);
//            this.createCameraPreviewSession();
//            // openCamera(width, height);
//        },

//        onSurfaceTextureSizeChanged: (texture, width, height) => {
//            console.log('onSurfaceTextureSizeChanged');
//            // configureTransform(width, height);
//        },

//        onSurfaceTextureDestroyed: (texture) => {
//            // console.log("onSurfaceTextureDestroyed");
//            return true;
//        },

//        onSurfaceTextureUpdated: (texture) => {
//            // console.log("onSurfaceTexturUpdated");
//        },

//    });
//}
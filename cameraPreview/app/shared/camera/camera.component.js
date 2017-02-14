var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var platformModule = require("platform");
var application = require("application");
var fs = require("file-system");
//@Interfaces([android.view.TextureView.SurfaceTextureListener])
//declare var record;
//declare var options;
//declare var java;
var Camera = (function (_super) {
    __extends(Camera, _super);
    //@ViewChild(placeholder) public Placeholder: placeholder;
    function Camera(page, routerExtensions) {
        var _this = _super.call(this) || this;
        _this.page = page;
        _this.routerExtensions = routerExtensions;
        _this.init = false;
        _this.closeCamera = function () {
            classesRef.mCameraDevice.close();
            classesRef.mCameraDevice = null;
            classesRef.mCameraOpenCloseLock.release();
        };
        _this.checkCamera = function () {
            var isActive;
            if (classesRef.mCameraDevice == null) {
                isActive = false;
            }
            else {
                isActive = true;
            }
            console.log(isActive);
            return isActive;
        };
        //public takeVideo = () => {
        //    var mMediaRecorder = new MediaRecorder();
        //    //android.content.Intent takeVideoIntent = new android.content.Intent(MediaStore.ACTION_VIDEO_CAPTURE);
        //    //if (takeVideoIntent.resolveActivity(getPackageManager()) != null) {
        //    //    startActivityForResult(takeVideoIntent, classesRef.REQUEST_VIDEO_CAPTURE);
        //    //}
        //}
        _this.test = function () {
        };
        _this.initRecorder = function () {
            classesRef.mMediaRecorder.setAudioSource(android.media.MediaRecorder.AudioSource.DEFAULT);
            classesRef.mMediaRecorder.setVideoSource(android.media.MediaRecorder.VideoSource.DEFAULT);
            var cpHigh = android.media.CamcorderProfile
                .get(android.media.CamcorderProfile.QUALITY_HIGH);
            classesRef.mMediaRecorder.setProfile(cpHigh);
            classesRef.mMediaRecorder.setOutputFile("/sdcard/videocapture_example.mp4");
            classesRef.mMediaRecorder.setMaxDuration(50000); // 50 seconds
            classesRef.mMediaRecorder.setMaxFileSize(5000000); // Approximately 5 megabytes
        };
        _this.takeVideo = function (Intent) {
            console.log('test');
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
        };
        _this.onSurfaceTextureDestroyed = function (texture) {
            // console.log("onSurfaceTextureDestroyed");
            return true;
        };
        _this.onSurfaceTextureUpdated = function (texture) {
            console.log("onSurfaceTexturUpdated");
        };
        _this.onLoaded = function (args) {
            console.log('1');
            //console.log(args.object);
            _this.page = args.object;
        };
        _this.onTakeShot = function (args) {
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
            if (classesRef.app.android) {
                console.log("onTakeShot");
                _this.lockFocus();
            }
        };
        _this.lockFocus = function () {
            console.log("lockFocus");
            classesRef.mState = classesRef.STATE_WAITING_LOCK;
            classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler);
            console.log(classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler));
            //this.captureStillPicture();
        };
        _this.runPrecaptureSequence = function () {
            console.log('3');
            // This is how to tell the camera to trigger. 
            classesRef.mPreviewRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AE_PRECAPTURE_TRIGGER, android.hardware.camera2.CaptureRequest.CONTROL_AE_PRECAPTURE_TRIGGER_START);
            // Tell #mCaptureCallback to wait for the precapture sequence to be set.
            classesRef.mState = classesRef.STATE_WAITING_PRECAPTURE;
            classesRef.mCaptureSession.capture(classesRef.mPreviewRequestBuilder.build(), classesRef.mCaptureCallback, classesRef.mBackgroundHandler);
        };
        _this.captureStillPicture = function () {
            console.log('4');
            console.log('captureStillPicture');
            // This is the CaptureRequest.Builder that we use to take a picture.
            var captureBuilder = classesRef.mCameraDevice.createCaptureRequest(android.hardware.camera2.CameraDevice.TEMPLATE_STILL_CAPTURE);
            captureBuilder.addTarget(classesRef.mImageReader.getSurface());
            // Use the same AE and AF modes as the preview.
            captureBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_AUTO, android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
            classesRef.setAutoFlash(captureBuilder);
            var CaptureCallback = android.hardware.camera2.CameraCaptureSession.CaptureCallback.extend({
                onCaptureCompleted: function (session, request, result) {
                    console.log("onCaptureCompleted");
                    console.log(result.toString());
                }
            });
            classesRef.mCaptureSession.stopRepeating();
            classesRef.mCaptureSession.capture(captureBuilder.build(), CaptureCallback, null);
        };
        _this.onCreatingView = function (args) {
            console.log('6'); // first
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
            if (classesRef.app.android) {
                var appContext = classesRef.app.android.context;
                var cameraManager = appContext.getSystemService(android.content.Context.CAMERA_SERVICE);
                var cameras = cameraManager.getCameraIdList();
                for (var index = 0; index < cameras.length; index++) {
                    var currentCamera = cameras[index];
                    var currentCameraSpecs = cameraManager.getCameraCharacteristics(currentCamera);
                    // get available lenses and set the camera-type (front or back)
                    var facing = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.LENS_FACING);
                    if (facing !== null && facing == android.hardware.camera2.CameraCharacteristics.LENS_FACING_FRONT) {
                        console.log("FRONT camera, was back");
                        _this.onLoaded(args);
                        classesRef.mCameraId = currentCamera;
                    }
                    // get all available sizes and set the format
                    var map = currentCameraSpecs.get(android.hardware.camera2.CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
                    var format = map.getOutputSizes(android.graphics.ImageFormat.JPEG);
                    console.log("---Format:--- " + format + " " + format.length + " " + format[4]);
                    // we are taking not the largest possible but some of the 5th in the list of resolutions
                    if (format && format !== null) {
                        console.log('Formattt----', format[0]);
                        var dimensions = format[5].toString().split('x');
                        var largestWidth = +dimensions[0];
                        var largestHeight = +dimensions[1];
                        // set the output image characteristics
                        classesRef.mImageReader = new android.media.ImageReader.newInstance(largestWidth, largestHeight, android.graphics.ImageFormat.JPEG, /*maxImages*/ 2);
                        classesRef.mImageReader.setOnImageAvailableListener(_this.mOnImageAvailableListener, classesRef.mBackgroundHandler);
                        console.log('here1');
                    }
                }
                classesRef.mStateCallBack = new _this.MyStateCallback();
                //API 23 runtime permission check
                if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.LOLLIPOP) {
                    console.log("checking presmisions ....");
                    if (android.support.v4.content.ContextCompat.checkSelfPermission(appContext, android.Manifest.permission.CAMERA) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
                        console.log("Permison already granted!!!!!");
                        cameraManager.openCamera(classesRef.mCameraId, classesRef.mStateCallBack, classesRef.mBackgroundHandler);
                    }
                    else if (android.support.v4.content.ContextCompat.checkSelfPermission(appContext, android.Manifest.permission.CAMERA) == android.content.pm.PackageManager.PERMISSION_DENIED) {
                        console.log("NO PERMISIONS - about to try get them!!!"); // I am crashing here - wrong reference for shouldShowRequestPermissionRationale !?
                        console.log(android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(appContext, android.Manifest.permission.CAMERA).toString());
                        if (android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale(appContext, android.Manifest.permission.CAMERA)) {
                            console.log("No Permission to use the Camera services");
                        }
                        // var stringArray = Array.create(java.lang.String, 1);
                        // stringArray[0] = android.Manifest.permission.CAMERA;
                        console.log("Permison is about to be granted!!!!");
                    }
                }
                else {
                    cameraManager.openCamera(classesRef.mCameraId, classesRef.mStateCallBack, classesRef.mBackgroundHandler);
                }
                // cameraManager.openCamera(mCameraId, mStateCallBack, mBackgroundHandler);
                console.log('here - before break point');
                classesRef.mTextureView = new android.view.TextureView(classesRef.app.android.context);
                console.log(classesRef.mTextureView);
                console.log(args);
                console.log('after args and mTextureView logs, before break');
                classesRef.mTextureView.setSurfaceTextureListener(_this.mSurfaceTextureListener); // the listener is populated, but the set is causing issues
                console.log('after break point');
                args.view = classesRef.mTextureView;
                //args.view.setAlpha(0.5); // make the camera view translucent
                console.log('-----', args.view);
            }
        };
        // from Java ; public static abstract class
        _this.MyCameraCaptureSessionStateCallback = android.hardware.camera2.CameraCaptureSession.StateCallback.extend({
            onConfigured: function (cameraCaptureSession) {
                console.log("onConfigured " + cameraCaptureSession);
                console.log('7');
                if (classesRef.mCameraDevice === null) {
                    console.log('classesRef.mCameraDevice === null');
                    return;
                }
                classesRef.mCaptureSession = cameraCaptureSession;
                // brakes here
                //classesRef.mPreviewRequestBuilder.set(android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE, android.hardware.camera2.CaptureRequest.CONTROL_AF_MODE_CONTINUOUS_PICTURE);
                // Flash is automatically enabled when necessary.
                //classesRef.setAutoFlash(classesRef.mPreviewRequestBuilder);
                // Finally, we start displaying the camera preview.
                classesRef.mPreviewRequest = classesRef.mPreviewRequestBuilder.build();
                classesRef.mCaptureSession.setRepeatingRequest(classesRef.mPreviewRequest, new _this.MyCaptureSessionCaptureCallback, null);
                _this.onSurfaceTextureUpdated;
            },
            onConfigureFailed: function (cameraCaptureSession) {
                console.log("onConfigureFailed " + cameraCaptureSession);
            }
        });
        // from Java : public static abstract class
        _this.MyCaptureSessionCaptureCallback = android.hardware.camera2.CameraCaptureSession.CaptureCallback.extend({
            //console.log('8');
            process: function (result) {
                switch (classesRef.mState) {
                    case classesRef.STATE_PREVIEW: {
                        // We have nothing to do when the camera preview is working normally.
                        break;
                    }
                    case classesRef.STATE_WAITING_LOCK: {
                        var afState = result.get(android.hardware.camera2.CaptureResult.CONTROL_AF_STATE);
                        if (afState === null) {
                            _this.captureStillPicture();
                        }
                        else if (android.hardware.camera2.CaptureResult.CONTROL_AF_STATE_FOCUSED_LOCKED == afState ||
                            android.hardware.camera2.CaptureResult.CONTROL_AF_STATE_NOT_FOCUSED_LOCKED == afState) {
                            // CONTROL_AE_STATE can be null on some devices
                            var aeState = result.get(android.hardware.camera2.CaptureResult.CONTROL_AE_STATE);
                            if (aeState === null ||
                                aeState == android.hardware.camera2.CaptureResult.CONTROL_AE_STATE_CONVERGED) {
                                classesRef.mState = classesRef.STATE_PICTURE_TAKEN;
                                _this.captureStillPicture();
                            }
                            else {
                                _this.runPrecaptureSequence();
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
                            _this.captureStillPicture();
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
                return;
            }
        });
        // (example for: java static interface to javaScript )
        // from Java : public static interface    
        _this.mOnImageAvailableListener = new android.media.ImageReader.OnImageAvailableListener({
            onImageAvailable: function (reader) {
                console.log('9');
                // here we should save our image to file when image is available
                console.log("onImageAvailable");
                console.log('reader', reader);
            }
        });
        _this.mSurfaceTextureListener = new android.view.TextureView.SurfaceTextureListener({
            onSurfaceTextureAvailable: function (texture, width, height) {
                console.log('10');
                classesRef.mSurfaceTexture = texture;
                console.log('classesRef.mSurfaceTexture -----mSurfaceTextureListener--', classesRef.mSurfaceTexture);
                _this.createCameraPreviewSession();
                //this.onSurfaceTextureAvailable
            },
            onSurfaceTextureSizeChanged: function (texture, width, height) {
                console.log('11');
                //this.onSurfaceTextureSizeChanged
            },
            onSurfaceTextureDestroyed: function (texture) {
                console.log('12');
                return true;
                //this.onSurfaceTextureDestroyed
            },
            onSurfaceTextureUpdated: function (texture) {
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
        _this.MyStateCallback = android.hardware.camera2.CameraDevice.StateCallback.extend({
            onOpened: function (cameraDevice) {
                console.log("onOpened " + cameraDevice);
                console.log('11');
                classesRef.mCameraOpenCloseLock.release();
                classesRef.mCameraDevice = cameraDevice;
                _this.createCameraPreviewSession();
            },
            onDisconnected: function (cameraDevice) {
                console.log("onDisconnected");
                classesRef.mCameraOpenCloseLock.release();
                cameraDevice.close();
                classesRef.mCameraDevice = null;
            },
            onError: function (cameraDevice, error) {
                console.log("onError");
                console.log("onError: device = " + cameraDevice);
                console.log("onError: error =  " + error);
                classesRef.mCameraOpenCloseLock.release();
                cameraDevice.close();
                classesRef.mCameraDevice = null;
            },
            onClosed: function (cameraDevice) {
                console.log("onClosed");
            }
        });
        //camera.requestPermissions();
        _this.height = platformModule.screen.mainScreen.heightPixels;
        _this.width = platformModule.screen.mainScreen.widthPixels;
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
        application.on(application.suspendEvent, function (args) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
                if (classesRef.mCameraDevice !== null) {
                    classesRef.mCameraDevice.close();
                    classesRef.mCameraDevice = null;
                }
                classesRef.mCameraOpenCloseLock.release();
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application.on(application.resumeEvent, function (args) {
            if (args.android) {
                console.log('on resume');
                //this.drawerComponent.navTo('home');
                _this.routerExtensions.back();
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                console.log('on resume');
                //this.drawerComponent.navTo('home');
                _this.routerExtensions.back();
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        return _this;
    }
    Camera.prototype.goBack = function () {
        classesRef.mCameraDevice.close();
        if (classesRef.mCameraDevice == null) {
            classesRef.mCameraDevice = null;
        }
        classesRef.mCameraOpenCloseLock.release();
    };
    Camera.prototype.onSurfaceTextureAvailable = function (texture, width, height) {
        console.log('onSurfaceTextureAvailable from public');
        classesRef.mSurfaceTexture = texture;
        console.log('classesRef.mSurfaceTexture-------------NOOO', classesRef.mSurfaceTexture);
        this.createCameraPreviewSession();
        //openCamera(width, height);
    };
    Camera.prototype.onSurfaceTextureSizeChanged = function (texture, width, height) {
        console.log('onSurfaceTextureSizeChanged');
        // configureTransform(width, height);
    };
    Camera.prototype.ngOnInit = function () {
        this.init = true;
        this.height = platformModule.screen.mainScreen.heightPixels;
        //this.page.height = platformModule.screen.mainScreen.heightPixels;
        console.log('height ----', this.height);
    };
    Camera.prototype.createCameraPreviewSession = function () {
        console.log('5');
        console.log("createCameraPreviewSession");
        //classesRef.mSurfaceTexture = android.graphics.SurfaceTexture();
        //classesRef.mSurfaceTexture = android.graphics.SurfaceTexture;
        //console.log(android.graphics.SurfaceTexture)
        if (!classesRef.mSurfaceTexture || !classesRef.mCameraDevice) {
            console.log('classesRef.mSurfaceTexture ----if --', classesRef.mSurfaceTexture);
            console.log('classesRef.mCameraDevice ----if --', classesRef.mCameraDevice);
            console.log(this.mSurfaceTextureListener); // was stopping here
            this.mSurfaceTextureListener; // HERE
            console.log('after onSurfaceTexture');
            return;
        }
        console.log('classesRef.mSurfaceTexture ---- after--', classesRef.mSurfaceTexture);
        console.log('classesRef.mCameraDevice ---- after--', classesRef.mCameraDevice);
        var texture = classesRef.mTextureView.getSurfaceTexture();
        console.log('texture');
        console.log(texture);
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
    };
    return Camera;
}(java.lang.Object));
Camera = __decorate([
    core_1.Component({
        selector: "Camera",
        templateUrl: "shared/camera/camera.html",
        styleUrls: ["shared/camera/camera-common.css"]
    }),
    core_1.Injectable() // this alows the compoennt to be exported for use in other pages
    ,
    __metadata("design:paramtypes", [page_1.Page, router_extensions_1.RouterExtensions])
], Camera);
exports.Camera = Camera;
// } else if (platformModule.isIOS) {
//     @Injectable()   
//     export class Camera {
//         constructor(private page: Page) {
//         }
//     }
// }
var classesRef = (function () {
    function classesRef(page) {
        this.page = page;
    }
    return classesRef;
}());
classesRef.app = require('application');
classesRef.mBackgroundHandler = null;
classesRef.mCameraOpenCloseLock = new java.util.concurrent.Semaphore(1);
classesRef.RESULT_CANCELED = 0;
classesRef.RESULT_OK = -1;
classesRef.REQUEST_VIDEO_CAPTURE = 999;
classesRef.REQUEST_CODE_ASK_PERMISSIONS = 1000;
classesRef.ORIENTATION_UNKNOWN = -1;
classesRef.PERMISSION_DENIED = -1;
classesRef.PERMISSION_GRANTED = 0;
classesRef.MARSHMALLOW = 23;
classesRef.currentapiVersion = android.os.Build.VERSION.SDK_INT;
classesRef.mMediaRecorder = new android.media.MediaRecorder();
classesRef.mNextVideoAbsolutePath = fs.knownFolders.documents();
//static that = new WeakRef(this);
classesRef.STATE_PREVIEW = 0;
classesRef.STATE_WAITING_LOCK = 1;
classesRef.STATE_WAITING_PRECAPTURE = 2;
classesRef.STATE_WAITING_NON_PRECAPTURE = 3;
classesRef.STATE_PICTURE_TAKEN = 4;
classesRef.mState = classesRef.STATE_PREVIEW;
exports.classesRef = classesRef;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZXJhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhbWVyYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0NBQXlFO0FBSXpFLGdDQUErQjtBQUMvQixtRkFBOEU7QUFDOUUseUNBQTRDO0FBQzVDLHlDQUE0QztBQUc1QyxnQ0FBbUM7QUFFbkMsZ0VBQWdFO0FBQ2hFLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsbUJBQW1CO0FBVW5CLElBQWEsTUFBTTtJQUFTLDBCQUFnQjtJQVF4QywwREFBMEQ7SUFDMUQsZ0JBQW9CLElBQVUsRUFBVSxnQkFBa0M7UUFBMUUsWUFDSSxpQkFBTyxTQW1EVjtRQXBEbUIsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUFVLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFKbkUsVUFBSSxHQUFZLEtBQUssQ0FBQztRQXlEdEIsaUJBQVcsR0FBRztZQUNqQixVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxDQUFDLENBQUE7UUFDTSxpQkFBVyxHQUFHO1lBQ2pCLElBQUksUUFBUSxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFBO1FBV0QsNEJBQTRCO1FBQzVCLCtDQUErQztRQUUvQyw2R0FBNkc7UUFDN0csMkVBQTJF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LGlEQUFpRDtBQUNqRCx1REFBdUQ7QUFDdkQsWUFBWTtBQUVaLFNBQVM7QUFDVCxHQUFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBwZXJtaXNzaW9ucyA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1wZXJtaXNzaW9ucycpO1xyXG5pbXBvcnQgcGxhY2Vob2xkZXIgPSByZXF1aXJlKFwidWkvcGxhY2Vob2xkZXJcIik7XHJcbmltcG9ydCBwbGFjZWhvbGRlck1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9wbGFjZWhvbGRlclwiKTtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zJ1xyXG5pbXBvcnQgcGxhdGZvcm1Nb2R1bGUgPSByZXF1aXJlKFwicGxhdGZvcm1cIik7XHJcbmltcG9ydCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvblwiKTtcclxuaW1wb3J0IGFwcCA9IHJlcXVpcmUoJ2FwcGxpY2F0aW9uJyk7XHJcbmltcG9ydCB1dGlscyA9IHJlcXVpcmUoXCJ1dGlscy91dGlsc1wiKTtcclxuaW1wb3J0IGZzID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xyXG5kZWNsYXJlIHZhciBhbmRyb2lkOyAvLyBkZWNsYXJlIGFuZGZyb2lkIHNvIHlvdSBoYXZlIGFjY2VzcyB0byAuY2FtZXJhMiAqKiB0aGlzIGlzIHZlcnkgaW1wb3J0YW50ISpcclxuLy9ASW50ZXJmYWNlcyhbYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3LlN1cmZhY2VUZXh0dXJlTGlzdGVuZXJdKVxyXG4vL2RlY2xhcmUgdmFyIHJlY29yZDtcclxuLy9kZWNsYXJlIHZhciBvcHRpb25zO1xyXG4vL2RlY2xhcmUgdmFyIGphdmE7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDYW1lcmFcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInNoYXJlZC9jYW1lcmEvY2FtZXJhLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wic2hhcmVkL2NhbWVyYS9jYW1lcmEtY29tbW9uLmNzc1wiXVxyXG59KVxyXG4vLyBpZiAocGxhdGZvcm1Nb2R1bGUuaXNBbmRyb2lkKSB7XHJcbkBJbmplY3RhYmxlKCkgICAvLyB0aGlzIGFsb3dzIHRoZSBjb21wb2VubnQgdG8gYmUgZXhwb3J0ZWQgZm9yIHVzZSBpbiBvdGhlciBwYWdlc1xyXG5leHBvcnQgY2xhc3MgQ2FtZXJhIGV4dGVuZHMgamF2YS5sYW5nLk9iamVjdCBpbXBsZW1lbnRzIE9uSW5pdCwgYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3LlN1cmZhY2VUZXh0dXJlTGlzdGVuZXIge1xyXG4gICBcclxuICAgIHB1YmxpYyBhcmdzOiBwbGFjZWhvbGRlci5DcmVhdGVWaWV3RXZlbnREYXRhOyAvLyBkZWZpbmUgd2hhdCBhcmdzIHdpbGwgYmUsICoqTk9UIFNFVFRJTkcgQU5ZIFZBTFVFUyoqXHJcbiAgICBcclxuICAgIHB1YmxpYyBvdXRwdXQ7XHJcbiAgICBwdWJsaWMgaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGhlaWdodDogYW55O1xyXG4gICAgcHVibGljIHdpZHRoOiBhbnk7XHJcbiAgICAvL0BWaWV3Q2hpbGQocGxhY2Vob2xkZXIpIHB1YmxpYyBQbGFjZWhvbGRlcjogcGxhY2Vob2xkZXI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy9jYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcclxuICAgICAgICB0aGlzLndpZHRoID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhQaXhlbHM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTY3JlZW4gaGVpZ2h0IGZyb20gQ2FtZXJhIE1vZHVsZTogXCIgKyBwbGF0Zm9ybU1vZHVsZS5zY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRQaXhlbHMpO1xyXG4gICAgICAgIC8vaWYgKGNsYXNzZXNSZWYuYXBwLmFuZHJvaWQpIHtcclxuICAgICAgICAvLyAgICB2YXIgbUNhbWVyYUlkO1xyXG4gICAgICAgIC8vICAgIHZhciBtQ2FwdHVyZVNlc3Npb247XHJcbiAgICAgICAgLy8gICAgdmFyIG1DYW1lcmFEZXZpY2U7XHJcbiAgICAgICAgLy8gICAgdmFyIG1TdGF0ZUNhbGxCYWNrO1xyXG4gICAgICAgIC8vICAgIHZhciBtQmFja2dyb3VuZEhhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIC8vICAgIHZhciBtQ2FtZXJhT3BlbkNsb3NlTG9jayA9IG5ldyBqYXZhLnV0aWwuY29uY3VycmVudC5TZW1hcGhvcmUoMSk7XHJcbiAgICAgICAgLy8gICAgdmFyIG1UZXh0dXJlVmlldztcclxuICAgICAgICAvLyAgICB2YXIgbVN1cmZhY2VUZXh0dXJlO1xyXG4gICAgICAgIC8vICAgIHZhciBtUHJldmlld1JlcXVlc3RCdWlsZGVyO1xyXG4gICAgICAgIC8vICAgIHZhciBtUHJldmlld1JlcXVlc3Q7XHJcbiAgICAgICAgLy8gICAgdmFyIG1JbWFnZVJlYWRlcjtcclxuICAgICAgICAvLyAgICB2YXIgbUNhcHR1cmVDYWxsYmFjaztcclxuICAgICAgICAvLyAgICB2YXIgbUZpbGU7XHJcbiAgICAgICAgLy99ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLnN1c3BlbmRFdmVudCwgKGFyZ3M6IGFwcGxpY2F0aW9uLkFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIGFuZHJvaWQgYWN0aXZpdHkgY2xhc3MuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYU9wZW5DbG9zZUxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgVUlBcHBsaWNhdGlvbi5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVUlBcHBsaWNhdGlvbjogXCIgKyBhcmdzLmlvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBsaWNhdGlvbi5vbihhcHBsaWNhdGlvbi5yZXN1bWVFdmVudCwgKGFyZ3M6IGFwcGxpY2F0aW9uLkFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbiByZXN1bWUnKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5kcmF3ZXJDb21wb25lbnQubmF2VG8oJ2hvbWUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY3Rpdml0eTogXCIgKyBhcmdzLmFuZHJvaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb24gcmVzdW1lJyk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZHJhd2VyQ29tcG9uZW50Lm5hdlRvKCdob21lJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGlPUyBhcHBsaWNhdGlvbnMsIGFyZ3MuaW9zIGlzIFVJQXBwbGljYXRpb24uXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVJQXBwbGljYXRpb246IFwiICsgYXJncy5pb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xvc2VDYW1lcmEgPSAoKSA9PiB7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlLmNsb3NlKCk7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlID0gbnVsbDtcclxuICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFPcGVuQ2xvc2VMb2NrLnJlbGVhc2UoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjaGVja0NhbWVyYSA9ICgpID0+IHtcclxuICAgICAgICB2YXIgaXNBY3RpdmU7XHJcbiAgICAgICAgaWYgKGNsYXNzZXNSZWYubUNhbWVyYURldmljZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhpc0FjdGl2ZSlcclxuICAgICAgICByZXR1cm4gaXNBY3RpdmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYURldmljZS5jbG9zZSgpO1xyXG4gICAgICAgIGlmIChjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFPcGVuQ2xvc2VMb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL3B1YmxpYyB0YWtlVmlkZW8gPSAoKSA9PiB7XHJcbiAgICAvLyAgICB2YXIgbU1lZGlhUmVjb3JkZXIgPSBuZXcgTWVkaWFSZWNvcmRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgLy9hbmRyb2lkLmNvbnRlbnQuSW50ZW50IHRha2VWaWRlb0ludGVudCA9IG5ldyBhbmRyb2lkLmNvbnRlbnQuSW50ZW50KE1lZGlhU3RvcmUuQUNUSU9OX1ZJREVPX0NBUFRVUkUpO1xyXG4gICAgLy8gICAgLy9pZiAodGFrZVZpZGVvSW50ZW50LnJlc29sdmVBY3Rpdml0eShnZXRQYWNrYWdlTWFuYWdlcigpKSAhPSBudWxsKSB7XHJcbiAgICAvLyAgICAvLyAgICBzdGFydEFjdGl2aXR5Rm9yUmVzdWx0KHRha2VWaWRlb0ludGVudCwgY2xhc3Nlc1JlZi5SRVFVRVNUX1ZJREVPX0NBUFRVUkUpO1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgIC8vfVxyXG4gICAgLy99XHJcbiAgICBwdWJsaWMgdGVzdCA9ICgpID0+IHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdFJlY29yZGVyID0gKCkgPT4ge1xyXG4gICAgY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRBdWRpb1NvdXJjZShhbmRyb2lkLm1lZGlhLk1lZGlhUmVjb3JkZXIuQXVkaW9Tb3VyY2UuREVGQVVMVCk7XHJcbiAgICBjbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnNldFZpZGVvU291cmNlKGFuZHJvaWQubWVkaWEuTWVkaWFSZWNvcmRlci5WaWRlb1NvdXJjZS5ERUZBVUxUKTtcclxuICAgIFxyXG4gICAgdmFyIGNwSGlnaCA9IGFuZHJvaWQubWVkaWEuQ2FtY29yZGVyUHJvZmlsZVxyXG4gICAgICAgIC5nZXQoYW5kcm9pZC5tZWRpYS5DYW1jb3JkZXJQcm9maWxlLlFVQUxJVFlfSElHSCk7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRQcm9maWxlKGNwSGlnaCk7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRPdXRwdXRGaWxlKFwiL3NkY2FyZC92aWRlb2NhcHR1cmVfZXhhbXBsZS5tcDRcIik7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRNYXhEdXJhdGlvbig1MDAwMCk7IC8vIDUwIHNlY29uZHNcclxuICAgICAgICBjbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnNldE1heEZpbGVTaXplKDUwMDAwMDApOyAvLyBBcHByb3hpbWF0ZWx5IDUgbWVnYWJ5dGVzXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRha2VWaWRlbyA9IChJbnRlbnQ6IGFuZHJvaWQuY29udGVudC5JbnRlbnQpID0+IHsgICAgLy8gdGhpcyBkb2VzIG5vdCB3b3JrIGFzIG9mIG5vd1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0JylcclxuICAgICAgICAvL3ZhciBtQ2FtZXJhID0gZ2V0Q2FtZXJhSW5zdGFuY2UoKTtcclxuICAgICAgICAvL21NZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoKTtcclxuXHJcbiAgICAgICAgLy8gU3RlcCAxOiBVbmxvY2sgYW5kIHNldCBjYW1lcmEgdG8gTWVkaWFSZWNvcmRlclxyXG4gICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYURldmljZS51bmxvY2soKTtcclxuICAgICAgICAvL2NsYXNzZXNSZWYubU1lZGlhUmVjb3JkZXIuc2V0Q2FtZXJhKGNsYXNzZXNSZWYubUNhbWVyYURldmljZSk7XHJcblxyXG4gICAgICAgIC8vLy8gU3RlcCAyOiBTZXQgc291cmNlc1xyXG4gICAgICAgIC8vY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRBdWRpb1NvdXJjZShhbmRyb2lkLm1lZGlhLk1lZGlhUmVjb3JkZXIuQXVkaW9Tb3VyY2UuQ0FNQ09SREVSKTtcclxuICAgICAgICAvL2NsYXNzZXNSZWYubU1lZGlhUmVjb3JkZXIuc2V0VmlkZW9Tb3VyY2UoYW5kcm9pZC5tZWRpYS5NZWRpYVJlY29yZGVyLlZpZGVvU291cmNlLkNBTUVSQSk7XHJcblxyXG4gICAgICAgIC8vLy8gU3RlcCAzOiBTZXQgYSBDYW1jb3JkZXJQcm9maWxlIChyZXF1aXJlcyBBUEkgTGV2ZWwgOCBvciBoaWdoZXIpXHJcbiAgICAgICAgLy9jbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnNldFByb2ZpbGUoYW5kcm9pZC5tZWRpYS5DYW1jb3JkZXJQcm9maWxlLmdldChhbmRyb2lkLm1lZGlhLkNhbWNvcmRlclByb2ZpbGUuUVVBTElUWV9ISUdIKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8vLyBTdGVwIDQ6IFNldCBvdXRwdXQgZmlsZVxyXG4gICAgICAgIC8vY2xhc3Nlc1JlZi5tTWVkaWFSZWNvcmRlci5zZXRPdXRwdXRGaWxlKFwiL3NkY2FyZC92aWRlb2NhcHR1cmVfZXhhbXBsZS5tcDRcIik7XHJcblxyXG4gICAgICAgIC8vLy8gU3RlcCA1OiBTZXQgdGhlIHByZXZpZXcgb3V0cHV0XHJcbiAgICAgICAgLy9jbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnNldFByZXZpZXdEaXNwbGF5KGNsYXNzZXNSZWYubVByZXZpZXdCdWlsZGVyKTtcclxuXHJcbiAgICAgICAgLy8gU3RlcCA2OiBQcmVwYXJlIGNvbmZpZ3VyZWQgTWVkaWFSZWNvcmRlclxyXG4gICAgICAgIC8vdHJ5IHtcclxuICAgICAgICAgICAgLy9jbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnByZXBhcmUoKTtcclxuICAgICAgICAvL30gY2F0Y2ggKElsbGVnYWxTdGF0ZUV4Y2VwdGlvbiBlKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coVEFHLCBcIklsbGVnYWxTdGF0ZUV4Y2VwdGlvbiBwcmVwYXJpbmcgTWVkaWFSZWNvcmRlcjogXCIgKyBlLmdldE1lc3NhZ2UoKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgIGNsYXNzZXNSZWYubU1lZGlhUmVjb3JkZXIucmVsZWFzZSgpO1xyXG4gICAgICAgIC8vICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvL30gdHJ5IChJT0V4Y2VwdGlvbiBlKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coVEFHLCBcIklPRXhjZXB0aW9uIHByZXBhcmluZyBNZWRpYVJlY29yZGVyOiBcIiArIGUuZ2V0TWVzc2FnZSgpKTtcclxuICAgICAgICAvLyAgICBjbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnJlbGVhc2UoKTtcclxuXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9jbGFzc2VzUmVmLm1NZWRpYVJlY29yZGVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25TdXJmYWNlVGV4dHVyZUF2YWlsYWJsZSh0ZXh0dXJlLCB3aWR0aCwgaGVpZ2h0KSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvblN1cmZhY2VUZXh0dXJlQXZhaWxhYmxlIGZyb20gcHVibGljJyk7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGFzc2VzUmVmLm1TdXJmYWNlVGV4dHVyZS0tLS0tLS0tLS0tLS1OT09PJywgY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2FtZXJhUHJldmlld1Nlc3Npb24oKTtcclxuICAgICAgICAvL29wZW5DYW1lcmEod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZCh0ZXh0dXJlLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ29uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZCcpO1xyXG4gICAgICAgIC8vIGNvbmZpZ3VyZVRyYW5zZm9ybSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdXJmYWNlVGV4dHVyZURlc3Ryb3llZCA9ICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblN1cmZhY2VUZXh0dXJlRGVzdHJveWVkXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1cmZhY2VUZXh0dXJlVXBkYXRlZCA9ICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKFwib25TdXJmYWNlVGV4dHVyVXBkYXRlZFwiKTtcclxuICAgICB9XHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGxhdGZvcm1Nb2R1bGUuc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0UGl4ZWxzO1xyXG4gICAgICAgIC8vdGhpcy5wYWdlLmhlaWdodCA9IHBsYXRmb3JtTW9kdWxlLnNjcmVlbi5tYWluU2NyZWVuLmhlaWdodFBpeGVscztcclxuICAgICAgICBjb25zb2xlLmxvZygnaGVpZ2h0IC0tLS0nLHRoaXMuaGVpZ2h0KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgb25Mb2FkZWQgPSAoYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcxJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhcmdzLm9iamVjdCk7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gYXJncy5vYmplY3Q7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVGFrZVNob3QgPSAoYXJncykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcyJyk7XHJcbiAgICAgICAgLy9pZiAoY2xhc3Nlc1JlZi5hcHAuaW9zKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIHZpZGVvQ29ubmVjdGlvbiA9IGNsYXNzZXNSZWYub3V0cHV0LmNvbm5lY3Rpb25zWzBdO1xyXG4gICAgICAgIC8vICAgIGNsYXNzZXNSZWYub3V0cHV0LmNhcHR1cmVTdGlsbEltYWdlQXN5bmNocm9ub3VzbHlGcm9tQ29ubmVjdGlvbkNvbXBsZXRpb25IYW5kbGVyKHZpZGVvQ29ubmVjdGlvbiwgZnVuY3Rpb24gKGJ1ZmZlciwgZXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgdmFyIGltYWdlRGF0YSA9IEFWQ2FwdHVyZVN0aWxsSW1hZ2VPdXRwdXQuanBlZ1N0aWxsSW1hZ2VOU0RhdGFSZXByZXNlbnRhdGlvbihidWZmZXIpO1xyXG4gICAgICAgIC8vICAgICAgICB2YXIgaW1hZ2UgPSBVSUltYWdlLmltYWdlV2l0aERhdGEoaW1hZ2VEYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgVUlJbWFnZVdyaXRlVG9TYXZlZFBob3Rvc0FsYnVtKGltYWdlLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgICAgICAvLyAgICAgICAgQXVkaW9TZXJ2aWNlc1BsYXlTeXN0ZW1Tb3VuZCgxNDQpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICBpZiAoY2xhc3Nlc1JlZi5hcHAuYW5kcm9pZCkgeyAvLyBXQVMgZWxzZSBpZiwgaW9zIGlzIGNvbW1lbnRlZCBvdXQgdW50aWxsIGkgZ2V0IGRlcGVuZGVuY2llcyBzZXR1cFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uVGFrZVNob3RcIik7XHJcbiAgICAgICAgICAgIHRoaXMubG9ja0ZvY3VzKCk7XHJcbiAgICAgICAgICAgIC8vIGNhcHR1cmVTdGlsbFBpY3R1cmUoKTsgLy8gSSBhZGRlZCB0aGlzISEhISEhLy9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvY2tGb2N1cyA9ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvY2tGb2N1c1wiKTtcclxuICAgICAgICBjbGFzc2VzUmVmLm1TdGF0ZSA9IGNsYXNzZXNSZWYuU1RBVEVfV0FJVElOR19MT0NLO1xyXG4gICAgICAgIGNsYXNzZXNSZWYubUNhcHR1cmVTZXNzaW9uLmNhcHR1cmUoY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3RCdWlsZGVyLmJ1aWxkKCksIGNsYXNzZXNSZWYubUNhcHR1cmVDYWxsYmFjaywgY2xhc3Nlc1JlZi5tQmFja2dyb3VuZEhhbmRsZXIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXNSZWYubUNhcHR1cmVTZXNzaW9uLmNhcHR1cmUoY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3RCdWlsZGVyLmJ1aWxkKCksIGNsYXNzZXNSZWYubUNhcHR1cmVDYWxsYmFjaywgY2xhc3Nlc1JlZi5tQmFja2dyb3VuZEhhbmRsZXIpKTtcclxuICAgICAgICAvL3RoaXMuY2FwdHVyZVN0aWxsUGljdHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBydW5QcmVjYXB0dXJlU2VxdWVuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJzMnKVxyXG4gICAgICAgIC8vIFRoaXMgaXMgaG93IHRvIHRlbGwgdGhlIGNhbWVyYSB0byB0cmlnZ2VyLiBcclxuICAgICAgICBjbGFzc2VzUmVmLm1QcmV2aWV3UmVxdWVzdEJ1aWxkZXIuc2V0KGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYXB0dXJlUmVxdWVzdC5DT05UUk9MX0FFX1BSRUNBUFRVUkVfVFJJR0dFUiwgYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXF1ZXN0LkNPTlRST0xfQUVfUFJFQ0FQVFVSRV9UUklHR0VSX1NUQVJUKTtcclxuICAgICAgICAvLyBUZWxsICNtQ2FwdHVyZUNhbGxiYWNrIHRvIHdhaXQgZm9yIHRoZSBwcmVjYXB0dXJlIHNlcXVlbmNlIHRvIGJlIHNldC5cclxuICAgICAgICBjbGFzc2VzUmVmLm1TdGF0ZSA9IGNsYXNzZXNSZWYuU1RBVEVfV0FJVElOR19QUkVDQVBUVVJFO1xyXG4gICAgICAgIGNsYXNzZXNSZWYubUNhcHR1cmVTZXNzaW9uLmNhcHR1cmUoY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3RCdWlsZGVyLmJ1aWxkKCksIGNsYXNzZXNSZWYubUNhcHR1cmVDYWxsYmFjaywgY2xhc3Nlc1JlZi5tQmFja2dyb3VuZEhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYXB0dXJlU3RpbGxQaWN0dXJlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCc0JylcclxuICAgICAgICBjb25zb2xlLmxvZygnY2FwdHVyZVN0aWxsUGljdHVyZScpO1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIENhcHR1cmVSZXF1ZXN0LkJ1aWxkZXIgdGhhdCB3ZSB1c2UgdG8gdGFrZSBhIHBpY3R1cmUuXHJcbiAgICAgICAgdmFyIGNhcHR1cmVCdWlsZGVyID0gY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlLmNyZWF0ZUNhcHR1cmVSZXF1ZXN0KGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYW1lcmFEZXZpY2UuVEVNUExBVEVfU1RJTExfQ0FQVFVSRSk7XHJcbiAgICAgICAgY2FwdHVyZUJ1aWxkZXIuYWRkVGFyZ2V0KGNsYXNzZXNSZWYubUltYWdlUmVhZGVyLmdldFN1cmZhY2UoKSk7XHJcblxyXG4gICAgICAgIC8vIFVzZSB0aGUgc2FtZSBBRSBhbmQgQUYgbW9kZXMgYXMgdGhlIHByZXZpZXcuXHJcbiAgICAgICAgY2FwdHVyZUJ1aWxkZXIuc2V0KGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYXB0dXJlUmVxdWVzdC5DT05UUk9MX0FGX01PREVfQVVUTywgYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXF1ZXN0LkNPTlRST0xfQUZfTU9ERV9DT05USU5VT1VTX1BJQ1RVUkUpO1xyXG4gICAgICAgIGNsYXNzZXNSZWYuc2V0QXV0b0ZsYXNoKGNhcHR1cmVCdWlsZGVyKTtcclxuXHJcbiAgICAgICAgdmFyIENhcHR1cmVDYWxsYmFjayA9IGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYW1lcmFDYXB0dXJlU2Vzc2lvbi5DYXB0dXJlQ2FsbGJhY2suZXh0ZW5kKHtcclxuICAgICAgICAgICAgb25DYXB0dXJlQ29tcGxldGVkOiAoc2Vzc2lvbiwgcmVxdWVzdCwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ2FwdHVyZUNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tQ2FwdHVyZVNlc3Npb24uc3RvcFJlcGVhdGluZygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNsYXNzZXNSZWYubUNhcHR1cmVTZXNzaW9uLmNhcHR1cmUoY2FwdHVyZUJ1aWxkZXIuYnVpbGQoKSwgQ2FwdHVyZUNhbGxiYWNrLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2FtZXJhUHJldmlld1Nlc3Npb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCc1JylcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZUNhbWVyYVByZXZpZXdTZXNzaW9uXCIpO1xyXG4gICAgICAgIC8vY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUgPSBhbmRyb2lkLmdyYXBoaWNzLlN1cmZhY2VUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9jbGFzc2VzUmVmLm1TdXJmYWNlVGV4dHVyZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3VyZmFjZVRleHR1cmU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhhbmRyb2lkLmdyYXBoaWNzLlN1cmZhY2VUZXh0dXJlKVxyXG4gICAgICAgIGlmICghY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUgfHwgIWNsYXNzZXNSZWYubUNhbWVyYURldmljZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUgLS0tLWlmIC0tJywgY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlIC0tLS1pZiAtLScsIGNsYXNzZXNSZWYubUNhbWVyYURldmljZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubVN1cmZhY2VUZXh0dXJlTGlzdGVuZXIpOyAvLyB3YXMgc3RvcHBpbmcgaGVyZVxyXG4gICAgICAgICAgICB0aGlzLm1TdXJmYWNlVGV4dHVyZUxpc3RlbmVyOyAvLyBIRVJFXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBvblN1cmZhY2VUZXh0dXJlJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlIC0tLS0gYWZ0ZXItLScsIGNsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlIC0tLS0gYWZ0ZXItLScsIGNsYXNzZXNSZWYubUNhbWVyYURldmljZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBjbGFzc2VzUmVmLm1UZXh0dXJlVmlldy5nZXRTdXJmYWNlVGV4dHVyZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0ZXh0dXJlJylcclxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0dXJlKVxyXG4gICAgICAgIC8vIFdlIGNvbmZpZ3VyZSB0aGUgc2l6ZSBvZiBkZWZhdWx0IGJ1ZmZlciB0byBiZSB0aGUgc2l6ZSBvZiBjYW1lcmEgcHJldmlldyB3ZSB3YW50LlxyXG4gICAgICAgIHRleHR1cmUuc2V0RGVmYXVsdEJ1ZmZlclNpemUoODAwLCA0ODApOyAvLyBicmVha1BvaW50IHRleHR1cmUgaXMgbnVsbFxyXG5cclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBvdXRwdXQgU3VyZmFjZSB3ZSBuZWVkIHRvIHN0YXJ0IHByZXZpZXcuXHJcbiAgICAgICAgdmFyIHN1cmZhY2UgPSBuZXcgYW5kcm9pZC52aWV3LlN1cmZhY2UodGV4dHVyZSk7XHJcblxyXG4gICAgICAgIC8vIC8vIFdlIHNldCB1cCBhIENhcHR1cmVSZXF1ZXN0LkJ1aWxkZXIgd2l0aCB0aGUgb3V0cHV0IFN1cmZhY2UuXHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3RCdWlsZGVyID0gY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlLmNyZWF0ZUNhcHR1cmVSZXF1ZXN0KGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYW1lcmFEZXZpY2UuVEVNUExBVEVfUFJFVklFVyk7XHJcbiAgICAgICAgY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3RCdWlsZGVyLmFkZFRhcmdldChzdXJmYWNlKTtcclxuICAgICAgICB2YXIgc3VyZmFjZUxpc3QgPSBuZXcgamF2YS51dGlsLkFycmF5TGlzdCgpO1xyXG4gICAgICAgIHN1cmZhY2VMaXN0LmFkZChzdXJmYWNlKTtcclxuICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UuY3JlYXRlQ2FwdHVyZVNlc3Npb24oc3VyZmFjZUxpc3QsIG5ldyB0aGlzLk15Q2FtZXJhQ2FwdHVyZVNlc3Npb25TdGF0ZUNhbGxiYWNrKCksIG51bGwpO1xyXG4gICAgICAgIC8vdGhpcy5tU3VyZmFjZVRleHR1cmVMaXN0ZW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25DcmVhdGluZ1ZpZXcgPSAoYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJzYnKSAvLyBmaXJzdFxyXG4gICAgICAgIC8vaWYgKGNsYXNzZXNSZWYuYXBwLmlvcykge1xyXG4gICAgICAgIC8vICAgIHZhciBzZXNzaW9uID0gbmV3IEFWQ2FwdHVyZVNlc3Npb24oKTtcclxuICAgICAgICAvLyAgICBzZXNzaW9uLnNlc3Npb25QcmVzZXQgPSBBVkNhcHR1cmVTZXNzaW9uUHJlc2V0MTI4MHg3MjA7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIEFkZGluZyBjYXB0dXJlIGRldmljZVxyXG4gICAgICAgIC8vICAgIHZhciBkZXZpY2UgPSBBVkNhcHR1cmVEZXZpY2UuZGVmYXVsdERldmljZVdpdGhNZWRpYVR5cGUoQVZNZWRpYVR5cGVWaWRlbyk7XHJcbiAgICAgICAgLy8gICAgdmFyIGlucHV0ID0gQVZDYXB0dXJlRGV2aWNlSW5wdXQuZGV2aWNlSW5wdXRXaXRoRGV2aWNlRXJyb3IoZGV2aWNlKTtcclxuICAgICAgICAvLyAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHRyeWluZyB0byBvcGVuIGNhbWVyYS5cIik7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIHNlc3Npb24uYWRkSW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAvLyAgICBjbGFzc2VzUmVmLm91dHB1dCA9IG5ldyBBVkNhcHR1cmVTdGlsbEltYWdlT3V0cHV0KCk7XHJcbiAgICAgICAgLy8gICAgc2Vzc2lvbi5hZGRPdXRwdXQoY2xhc3Nlc1JlZi5vdXRwdXQpO1xyXG5cclxuICAgICAgICAvLyAgICBzZXNzaW9uLnN0YXJ0UnVubmluZygpO1xyXG5cclxuICAgICAgICAvLyAgICB2YXIgdmlkZW9MYXllciA9IEFWQ2FwdHVyZVZpZGVvUHJldmlld0xheWVyLmxheWVyV2l0aFNlc3Npb24oc2Vzc2lvbik7XHJcblxyXG4gICAgICAgIC8vICAgIHZhciB2aWV3ID0gVUlWaWV3LmFsbG9jKCkuaW5pdFdpdGhGcmFtZSh7IG9yaWdpbjogeyB4OiAwLCB5OiAwIH0sIHNpemU6IHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiA2MDAgfSB9KTtcclxuICAgICAgICAvLyAgICB2aWRlb0xheWVyLmZyYW1lID0gdmlldy5ib3VuZHM7XHJcbiAgICAgICAgLy8gICAgdmlldy5sYXllci5hZGRTdWJsYXllcih2aWRlb0xheWVyKTtcclxuICAgICAgICAvLyAgICBhcmdzLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgaWYgKGNsYXNzZXNSZWYuYXBwLmFuZHJvaWQpIHsgLy8gd2FzIGVsc2UgaWZcclxuICAgICAgICAgICAgdmFyIGFwcENvbnRleHQgPSBjbGFzc2VzUmVmLmFwcC5hbmRyb2lkLmNvbnRleHQ7XHJcbiAgICAgICAgICAgIHZhciBjYW1lcmFNYW5hZ2VyID0gYXBwQ29udGV4dC5nZXRTeXN0ZW1TZXJ2aWNlKGFuZHJvaWQuY29udGVudC5Db250ZXh0LkNBTUVSQV9TRVJWSUNFKTtcclxuICAgICAgICAgICAgdmFyIGNhbWVyYXMgPSBjYW1lcmFNYW5hZ2VyLmdldENhbWVyYUlkTGlzdCgpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY2FtZXJhcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Q2FtZXJhID0gY2FtZXJhc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudENhbWVyYVNwZWNzID0gY2FtZXJhTWFuYWdlci5nZXRDYW1lcmFDaGFyYWN0ZXJpc3RpY3MoY3VycmVudENhbWVyYSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGF2YWlsYWJsZSBsZW5zZXMgYW5kIHNldCB0aGUgY2FtZXJhLXR5cGUgKGZyb250IG9yIGJhY2spXHJcbiAgICAgICAgICAgICAgICB2YXIgZmFjaW5nID0gY3VycmVudENhbWVyYVNwZWNzLmdldChhbmRyb2lkLmhhcmR3YXJlLmNhbWVyYTIuQ2FtZXJhQ2hhcmFjdGVyaXN0aWNzLkxFTlNfRkFDSU5HKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGZhY2luZyAhPT0gbnVsbCAmJiBmYWNpbmcgPT0gYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhbWVyYUNoYXJhY3RlcmlzdGljcy5MRU5TX0ZBQ0lOR19GUk9OVCkgeyAvLyB3YXMgTEVOU19GQUNJTkdfQkFDS1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRlJPTlQgY2FtZXJhLCB3YXMgYmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYUlkID0gY3VycmVudENhbWVyYTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGF2YWlsYWJsZSBzaXplcyBhbmQgc2V0IHRoZSBmb3JtYXRcclxuICAgICAgICAgICAgICAgIHZhciBtYXAgPSBjdXJyZW50Q2FtZXJhU3BlY3MuZ2V0KGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYW1lcmFDaGFyYWN0ZXJpc3RpY3MuU0NBTEVSX1NUUkVBTV9DT05GSUdVUkFUSU9OX01BUCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ID0gbWFwLmdldE91dHB1dFNpemVzKGFuZHJvaWQuZ3JhcGhpY3MuSW1hZ2VGb3JtYXQuSlBFRyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLUZvcm1hdDotLS0gXCIgKyBmb3JtYXQgKyBcIiBcIiArIGZvcm1hdC5sZW5ndGggKyBcIiBcIiArIGZvcm1hdFs0XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd2UgYXJlIHRha2luZyBub3QgdGhlIGxhcmdlc3QgcG9zc2libGUgYnV0IHNvbWUgb2YgdGhlIDV0aCBpbiB0aGUgbGlzdCBvZiByZXNvbHV0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCAmJiBmb3JtYXQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRm9ybWF0dHQtLS0tJyxmb3JtYXRbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBmb3JtYXRbNV0udG9TdHJpbmcoKS5zcGxpdCgneCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXJnZXN0V2lkdGggPSArZGltZW5zaW9uc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFyZ2VzdEhlaWdodCA9ICtkaW1lbnNpb25zWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgb3V0cHV0IGltYWdlIGNoYXJhY3RlcmlzdGljc1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNSZWYubUltYWdlUmVhZGVyID0gbmV3IGFuZHJvaWQubWVkaWEuSW1hZ2VSZWFkZXIubmV3SW5zdGFuY2UobGFyZ2VzdFdpZHRoLCBsYXJnZXN0SGVpZ2h0LCBhbmRyb2lkLmdyYXBoaWNzLkltYWdlRm9ybWF0LkpQRUcsIC8qbWF4SW1hZ2VzKi8yKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzUmVmLm1JbWFnZVJlYWRlci5zZXRPbkltYWdlQXZhaWxhYmxlTGlzdGVuZXIodGhpcy5tT25JbWFnZUF2YWlsYWJsZUxpc3RlbmVyLCBjbGFzc2VzUmVmLm1CYWNrZ3JvdW5kSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlcmUxJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsYXNzZXNSZWYubVN0YXRlQ2FsbEJhY2sgPSBuZXcgdGhpcy5NeVN0YXRlQ2FsbGJhY2soKTsgXHJcblxyXG4gICAgICAgICAgICAvL0FQSSAyMyBydW50aW1lIHBlcm1pc3Npb24gY2hlY2tcclxuICAgICAgICAgICAgaWYgKGFuZHJvaWQub3MuQnVpbGQuVkVSU0lPTi5TREtfSU5UID4gYW5kcm9pZC5vcy5CdWlsZC5WRVJTSU9OX0NPREVTLkxPTExJUE9QKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIHByZXNtaXNpb25zIC4uLi5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5kcm9pZC5zdXBwb3J0LnY0LmNvbnRlbnQuQ29udGV4dENvbXBhdC5jaGVja1NlbGZQZXJtaXNzaW9uKGFwcENvbnRleHQsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkEpID09IGFuZHJvaWQuY29udGVudC5wbS5QYWNrYWdlTWFuYWdlci5QRVJNSVNTSU9OX0dSQU5URUQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQZXJtaXNvbiBhbHJlYWR5IGdyYW50ZWQhISEhIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFNYW5hZ2VyLm9wZW5DYW1lcmEoY2xhc3Nlc1JlZi5tQ2FtZXJhSWQsIGNsYXNzZXNSZWYubVN0YXRlQ2FsbEJhY2ssIGNsYXNzZXNSZWYubUJhY2tncm91bmRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFuZHJvaWQuc3VwcG9ydC52NC5jb250ZW50LkNvbnRleHRDb21wYXQuY2hlY2tTZWxmUGVybWlzc2lvbihhcHBDb250ZXh0LCBhbmRyb2lkLk1hbmlmZXN0LnBlcm1pc3Npb24uQ0FNRVJBKSA9PSBhbmRyb2lkLmNvbnRlbnQucG0uUGFja2FnZU1hbmFnZXIuUEVSTUlTU0lPTl9ERU5JRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5PIFBFUk1JU0lPTlMgLSBhYm91dCB0byB0cnkgZ2V0IHRoZW0hISFcIik7IC8vIEkgYW0gY3Jhc2hpbmcgaGVyZSAtIHdyb25nIHJlZmVyZW5jZSBmb3Igc2hvdWxkU2hvd1JlcXVlc3RQZXJtaXNzaW9uUmF0aW9uYWxlICE/XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFuZHJvaWQuc3VwcG9ydC52NC5hcHAuQWN0aXZpdHlDb21wYXQuc2hvdWxkU2hvd1JlcXVlc3RQZXJtaXNzaW9uUmF0aW9uYWxlKGFwcENvbnRleHQsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkEpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgaWYgKGFuZHJvaWQuc3VwcG9ydC52NC5hcHAuQWN0aXZpdHlDb21wYXQuc2hvdWxkU2hvd1JlcXVlc3RQZXJtaXNzaW9uUmF0aW9uYWxlKGFwcENvbnRleHQsIGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gUGVybWlzc2lvbiB0byB1c2UgdGhlIENhbWVyYSBzZXJ2aWNlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHN0cmluZ0FycmF5ID0gQXJyYXkuY3JlYXRlKGphdmEubGFuZy5TdHJpbmcsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAvLyBzdHJpbmdBcnJheVswXSA9IGFuZHJvaWQuTWFuaWZlc3QucGVybWlzc2lvbi5DQU1FUkE7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGVybWlzb24gaXMgYWJvdXQgdG8gYmUgZ3JhbnRlZCEhISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8vYW5kcm9pZC5zdXBwb3J0LnY0LmFwcC5BY3Rpdml0eUNvbXBhdC5yZXF1ZXN0UGVybWlzc2lvbnMoYXBwQ29udGV4dCwgW10sIFJFUVVFU1RfQ0FNRVJBX1JFU1VMVCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmFNYW5hZ2VyLm9wZW5DYW1lcmEoY2xhc3Nlc1JlZi5tQ2FtZXJhSWQsIGNsYXNzZXNSZWYubVN0YXRlQ2FsbEJhY2ssIGNsYXNzZXNSZWYubUJhY2tncm91bmRIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY2FtZXJhTWFuYWdlci5vcGVuQ2FtZXJhKG1DYW1lcmFJZCwgbVN0YXRlQ2FsbEJhY2ssIG1CYWNrZ3JvdW5kSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlIC0gYmVmb3JlIGJyZWFrIHBvaW50JylcclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tVGV4dHVyZVZpZXcgPSBuZXcgYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3KGNsYXNzZXNSZWYuYXBwLmFuZHJvaWQuY29udGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXNSZWYubVRleHR1cmVWaWV3KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJncyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhZnRlciBhcmdzIGFuZCBtVGV4dHVyZVZpZXcgbG9ncywgYmVmb3JlIGJyZWFrJylcclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tVGV4dHVyZVZpZXcuc2V0U3VyZmFjZVRleHR1cmVMaXN0ZW5lcih0aGlzLm1TdXJmYWNlVGV4dHVyZUxpc3RlbmVyKTsgLy8gdGhlIGxpc3RlbmVyIGlzIHBvcHVsYXRlZCwgYnV0IHRoZSBzZXQgaXMgY2F1c2luZyBpc3N1ZXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyIGJyZWFrIHBvaW50JylcclxuICAgICAgICAgICAgYXJncy52aWV3ID0gY2xhc3Nlc1JlZi5tVGV4dHVyZVZpZXc7XHJcbiAgICAgICAgICAgIC8vYXJncy52aWV3LnNldEFscGhhKDAuNSk7IC8vIG1ha2UgdGhlIGNhbWVyYSB2aWV3IHRyYW5zbHVjZW50XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0nLGFyZ3Mudmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZnJvbSBKYXZhIDsgcHVibGljIHN0YXRpYyBhYnN0cmFjdCBjbGFzc1xyXG4gICAgcHVibGljIE15Q2FtZXJhQ2FwdHVyZVNlc3Npb25TdGF0ZUNhbGxiYWNrID0gYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhbWVyYUNhcHR1cmVTZXNzaW9uLlN0YXRlQ2FsbGJhY2suZXh0ZW5kKHtcclxuICAgICAgICBvbkNvbmZpZ3VyZWQ6IChjYW1lcmFDYXB0dXJlU2Vzc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uQ29uZmlndXJlZCBcIiArIGNhbWVyYUNhcHR1cmVTZXNzaW9uKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJzcnKTtcclxuICAgICAgICAgICAgaWYgKGNsYXNzZXNSZWYubUNhbWVyYURldmljZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzZXNSZWYubUNhbWVyYURldmljZSA9PT0gbnVsbCcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsYXNzZXNSZWYubUNhcHR1cmVTZXNzaW9uID0gY2FtZXJhQ2FwdHVyZVNlc3Npb247XHJcbiAgICAgICAgICAgIC8vIGJyYWtlcyBoZXJlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2NsYXNzZXNSZWYubVByZXZpZXdSZXF1ZXN0QnVpbGRlci5zZXQoYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXF1ZXN0LkNPTlRST0xfQUZfTU9ERSwgYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXF1ZXN0LkNPTlRST0xfQUZfTU9ERV9DT05USU5VT1VTX1BJQ1RVUkUpO1xyXG4gICAgICAgICAgICAgLy8gRmxhc2ggaXMgYXV0b21hdGljYWxseSBlbmFibGVkIHdoZW4gbmVjZXNzYXJ5LlxyXG4gICAgICAgICAgICAvL2NsYXNzZXNSZWYuc2V0QXV0b0ZsYXNoKGNsYXNzZXNSZWYubVByZXZpZXdSZXF1ZXN0QnVpbGRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBGaW5hbGx5LCB3ZSBzdGFydCBkaXNwbGF5aW5nIHRoZSBjYW1lcmEgcHJldmlldy5cclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tUHJldmlld1JlcXVlc3QgPSBjbGFzc2VzUmVmLm1QcmV2aWV3UmVxdWVzdEJ1aWxkZXIuYnVpbGQoKTtcclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tQ2FwdHVyZVNlc3Npb24uc2V0UmVwZWF0aW5nUmVxdWVzdChjbGFzc2VzUmVmLm1QcmV2aWV3UmVxdWVzdCwgbmV3IHRoaXMuTXlDYXB0dXJlU2Vzc2lvbkNhcHR1cmVDYWxsYmFjaywgbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TdXJmYWNlVGV4dHVyZVVwZGF0ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNvbmZpZ3VyZUZhaWxlZDogZnVuY3Rpb24gKGNhbWVyYUNhcHR1cmVTZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25Db25maWd1cmVGYWlsZWQgXCIgKyBjYW1lcmFDYXB0dXJlU2Vzc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZnJvbSBKYXZhIDogcHVibGljIHN0YXRpYyBhYnN0cmFjdCBjbGFzc1xyXG4gICAgcHVibGljIE15Q2FwdHVyZVNlc3Npb25DYXB0dXJlQ2FsbGJhY2sgPSBhbmRyb2lkLmhhcmR3YXJlLmNhbWVyYTIuQ2FtZXJhQ2FwdHVyZVNlc3Npb24uQ2FwdHVyZUNhbGxiYWNrLmV4dGVuZCh7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnOCcpO1xyXG4gICAgICAgIHByb2Nlc3M6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjbGFzc2VzUmVmLm1TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjbGFzc2VzUmVmLlNUQVRFX1BSRVZJRVc6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIG5vdGhpbmcgdG8gZG8gd2hlbiB0aGUgY2FtZXJhIHByZXZpZXcgaXMgd29ya2luZyBub3JtYWxseS5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgY2xhc3Nlc1JlZi5TVEFURV9XQUlUSU5HX0xPQ0s6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWZTdGF0ZSA9IHJlc3VsdC5nZXQoYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRl9TVEFURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFmU3RhdGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlU3RpbGxQaWN0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbmRyb2lkLmhhcmR3YXJlLmNhbWVyYTIuQ2FwdHVyZVJlc3VsdC5DT05UUk9MX0FGX1NUQVRFX0ZPQ1VTRURfTE9DS0VEID09IGFmU3RhdGUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRl9TVEFURV9OT1RfRk9DVVNFRF9MT0NLRUQgPT0gYWZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDT05UUk9MX0FFX1NUQVRFIGNhbiBiZSBudWxsIG9uIHNvbWUgZGV2aWNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWVTdGF0ZSA9IHJlc3VsdC5nZXQoYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRV9TVEFURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZVN0YXRlID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZVN0YXRlID09IGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYXB0dXJlUmVzdWx0LkNPTlRST0xfQUVfU1RBVEVfQ09OVkVSR0VEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzUmVmLm1TdGF0ZSA9IGNsYXNzZXNSZWYuU1RBVEVfUElDVFVSRV9UQUtFTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdHVyZVN0aWxsUGljdHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5QcmVjYXB0dXJlU2VxdWVuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgY2xhc3Nlc1JlZi5TVEFURV9XQUlUSU5HX1BSRUNBUFRVUkU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDT05UUk9MX0FFX1NUQVRFIGNhbiBiZSBudWxsIG9uIHNvbWUgZGV2aWNlc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhZVN0YXRlZSA9IHJlc3VsdC5nZXQoYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRV9TVEFURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFlU3RhdGVlID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFlU3RhdGVlID09IGFuZHJvaWQuaGFyZHdhcmUuY2FtZXJhMi5DYXB0dXJlUmVzdWx0LkNPTlRST0xfQUVfU1RBVEVfUFJFQ0FQVFVSRSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZVN0YXRlZSA9PSBhbmRyb2lkLmhhcmR3YXJlLmNhbWVyYTIuQ2FwdHVyZVJlcXVlc3QuQ09OVFJPTF9BRV9TVEFURV9GTEFTSF9SRVFVSVJFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzUmVmLm1TdGF0ZSA9IGNsYXNzZXNSZWYuU1RBVEVfV0FJVElOR19OT05fUFJFQ0FQVFVSRTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNsYXNzZXNSZWYuU1RBVEVfV0FJVElOR19OT05fUFJFQ0FQVFVSRToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENPTlRST0xfQUVfU1RBVEUgY2FuIGJlIG51bGwgb24gc29tZSBkZXZpY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFlU3RhdGVlZSA9IHJlc3VsdC5nZXQoYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRV9TVEFURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFlU3RhdGVlZSA9PT0gbnVsbCB8fCBhZVN0YXRlZWUgIT0gYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhcHR1cmVSZXN1bHQuQ09OVFJPTF9BRV9TVEFURV9QUkVDQVBUVVJFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXNSZWYubVN0YXRlID0gY2xhc3Nlc1JlZi5TVEFURV9QSUNUVVJFX1RBS0VOO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmVTdGlsbFBpY3R1cmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2FwdHVyZVByb2dyZXNzZWQ6IGZ1bmN0aW9uIChzZXNzaW9uLCByZXF1ZXN0LCBwYXJ0aWFsUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25DYXB0dXJlUHJvZ3Jlc3NlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzKHBhcnRpYWxSZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYXB0dXJlQ29tcGxldGVkOiBmdW5jdGlvbiAoc2Vzc2lvbiwgcmVxdWVzdCwgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwib25DYXB0dXJlQ29tcGxldGVkXCIpOyAvLyByZXBlYXRzISEhISFcclxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNhcHR1cmVGYWlsZWQ6IGZ1bmN0aW9uIChzZXNzaW9uLCByZXF1ZXN0LCBmYWlsdXJlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25DYXB0dXJlRmFpbGVkXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbHVyZScsIGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAvL2NsYXNzZXNSZWYubUNhbWVyYURldmljZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UgPSBudWxsO1xyXG4gICAgICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFPcGVuQ2xvc2VMb2NrLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gKGV4YW1wbGUgZm9yOiBqYXZhIHN0YXRpYyBpbnRlcmZhY2UgdG8gamF2YVNjcmlwdCApXHJcbiAgICAvLyBmcm9tIEphdmEgOiBwdWJsaWMgc3RhdGljIGludGVyZmFjZSAgICBcclxuICAgIHB1YmxpYyBtT25JbWFnZUF2YWlsYWJsZUxpc3RlbmVyID0gbmV3IGFuZHJvaWQubWVkaWEuSW1hZ2VSZWFkZXIuT25JbWFnZUF2YWlsYWJsZUxpc3RlbmVyKHtcclxuICAgICAgICBvbkltYWdlQXZhaWxhYmxlOiAocmVhZGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCc5JylcclxuICAgICAgICAgICAgLy8gaGVyZSB3ZSBzaG91bGQgc2F2ZSBvdXIgaW1hZ2UgdG8gZmlsZSB3aGVuIGltYWdlIGlzIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uSW1hZ2VBdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFkZXInLHJlYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7ICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBwdWJsaWMgbVN1cmZhY2VUZXh0dXJlTGlzdGVuZXIgPSBuZXcgYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3LlN1cmZhY2VUZXh0dXJlTGlzdGVuZXIoe1xyXG4gICAgICAgIG9uU3VyZmFjZVRleHR1cmVBdmFpbGFibGU6ICh0ZXh0dXJlLCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcxMCcpXHJcbiAgICAgICAgICAgIGNsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlIC0tLS0tbVN1cmZhY2VUZXh0dXJlTGlzdGVuZXItLScsIGNsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDYW1lcmFQcmV2aWV3U2Vzc2lvbigpO1xyXG4gICAgICAgICAgICAvL3RoaXMub25TdXJmYWNlVGV4dHVyZUF2YWlsYWJsZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZDogKHRleHR1cmUsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJzExJylcclxuICAgICAgICAgICAgLy90aGlzLm9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3VyZmFjZVRleHR1cmVEZXN0cm95ZWQ6ICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcxMicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvL3RoaXMub25TdXJmYWNlVGV4dHVyZURlc3Ryb3llZFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uU3VyZmFjZVRleHR1cmVVcGRhdGVkOiAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcxMycsIHRleHR1cmUpOyAvLyBzaG91bGQgYmUgcmVwZWF0aW5nIGNvbnN0YW50bHlcclxuICAgICAgICAgICAgLy90aGlzLm9uU3VyZmFjZVRleHR1cmVVcGRhdGVkXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25TdXJmYWNlVGV4dHVyVXBkYXRlZFwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZyb20gSmF2YSA6IHB1YmxpYyBzdGF0aWMgaW50ZXJmYWNlICAgIC8vIFdST05HIE9ORVxyXG4gICAgLy9wdWJsaWMgbVN1cmZhY2VUZXh0dXJlTGlzdGVuZXIgPSAoKSA9PiBuZXcgYW5kcm9pZC52aWV3LlRleHR1cmVWaWV3LlN1cmZhY2VUZXh0dXJlTGlzdGVuZXIoe1xyXG5cclxuICAgIC8vICAgIG9uU3VyZmFjZVRleHR1cmVBdmFpbGFibGU6ICh0ZXh0dXJlLCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICAvLyAgICAgICAgY29uc29sZS5sb2coJ29uU3VyZmFjZVRleHR1cmVBdmFpbGFibGUnKTtcclxuICAgIC8vICAgICAgICBjbGFzc2VzUmVmLm1TdXJmYWNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAvLyAgICAgICAgY29uc29sZS5sb2coJ2NsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlLS0tLS0tLS0tLS0tLScsIGNsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlKTtcclxuICAgIC8vICAgICAgICB0aGlzLmNyZWF0ZUNhbWVyYVByZXZpZXdTZXNzaW9uKCk7IFxyXG4gICAgLy8gICAgICAgIC8vIG9wZW5DYW1lcmEod2lkdGgsIGhlaWdodCk7XHJcbiAgICAvLyAgICB9LFxyXG5cclxuICAgIC8vICAgIG9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZDogKHRleHR1cmUsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICAgIC8vICAgICAgICBjb25zb2xlLmxvZygnb25TdXJmYWNlVGV4dHVyZVNpemVDaGFuZ2VkJyk7XHJcbiAgICAvLyAgICAgICAgLy8gY29uZmlndXJlVHJhbnNmb3JtKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgLy8gICAgfSxcclxuXHJcbiAgICAvLyAgICBvblN1cmZhY2VUZXh0dXJlRGVzdHJveWVkOiAodGV4dHVyZSkgPT4ge1xyXG4gICAgLy8gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25TdXJmYWNlVGV4dHVyZURlc3Ryb3llZFwiKTtcclxuICAgIC8vICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIC8vICAgIH0sXHJcblxyXG4gICAgLy8gICAgb25TdXJmYWNlVGV4dHVyZVVwZGF0ZWQ6ICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwib25TdXJmYWNlVGV4dHVyVXBkYXRlZFwiKTtcclxuICAgIC8vICAgIH0sXHJcblxyXG4gICAgLy99KTtcclxuXHJcbiAgICAvLyBmcm9tIEphdmEgOiBwdWJsaWMgc3RhdGljIGFic3RyYWN0IGNsYXNzXHJcbiAgICBwdWJsaWMgTXlTdGF0ZUNhbGxiYWNrID0gYW5kcm9pZC5oYXJkd2FyZS5jYW1lcmEyLkNhbWVyYURldmljZS5TdGF0ZUNhbGxiYWNrLmV4dGVuZCh7XHJcbiAgICAgICAgb25PcGVuZWQ6IChjYW1lcmFEZXZpY2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbk9wZW5lZCBcIiArIGNhbWVyYURldmljZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcxMScpXHJcbiAgICAgICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYU9wZW5DbG9zZUxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UgPSBjYW1lcmFEZXZpY2U7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2FtZXJhUHJldmlld1Nlc3Npb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRGlzY29ubmVjdGVkOiAgKGNhbWVyYURldmljZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uRGlzY29ubmVjdGVkXCIpO1xyXG5cclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhT3BlbkNsb3NlTG9jay5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIGNhbWVyYURldmljZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICBjbGFzc2VzUmVmLm1DYW1lcmFEZXZpY2UgPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25FcnJvcjogKGNhbWVyYURldmljZSwgZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkVycm9yXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uRXJyb3I6IGRldmljZSA9IFwiICsgY2FtZXJhRGV2aWNlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkVycm9yOiBlcnJvciA9ICBcIiArIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIGNsYXNzZXNSZWYubUNhbWVyYU9wZW5DbG9zZUxvY2sucmVsZWFzZSgpO1xyXG4gICAgICAgICAgICBjYW1lcmFEZXZpY2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgY2xhc3Nlc1JlZi5tQ2FtZXJhRGV2aWNlID0gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ2xvc2VkOiAoY2FtZXJhRGV2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25DbG9zZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG4vLyB9IGVsc2UgaWYgKHBsYXRmb3JtTW9kdWxlLmlzSU9TKSB7XHJcbi8vICAgICBASW5qZWN0YWJsZSgpICAgXHJcbi8vICAgICBleHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuLy8gICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UpIHtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG5leHBvcnQgY2xhc3MgY2xhc3Nlc1JlZiB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBhcHAgPSByZXF1aXJlKCdhcHBsaWNhdGlvbicpO1xyXG4gICAgc3RhdGljIG91dHB1dDtcclxuICAgIHN0YXRpYyBtQ2FtZXJhSWQ7XHJcbiAgICBzdGF0aWMgbUNhcHR1cmVTZXNzaW9uO1xyXG4gICAgc3RhdGljIG1DYW1lcmFEZXZpY2U7XHJcbiAgICBzdGF0aWMgbVN0YXRlQ2FsbEJhY2s7XHJcbiAgICBzdGF0aWMgbUJhY2tncm91bmRIYW5kbGVyID0gbnVsbDtcclxuICAgIHN0YXRpYyBtQ2FtZXJhT3BlbkNsb3NlTG9jayA9IG5ldyBqYXZhLnV0aWwuY29uY3VycmVudC5TZW1hcGhvcmUoMSk7XHJcbiAgICBzdGF0aWMgbVRleHR1cmVWaWV3O1xyXG4gICAgc3RhdGljIG1TdXJmYWNlVGV4dHVyZTtcclxuICAgIHN0YXRpYyBtUHJldmlld1JlcXVlc3RCdWlsZGVyO1xyXG4gICAgc3RhdGljIG1QcmV2aWV3UmVxdWVzdDtcclxuICAgIHN0YXRpYyBtSW1hZ2VSZWFkZXI7XHJcbiAgICBzdGF0aWMgbUNhcHR1cmVDYWxsYmFjaztcclxuICAgIHN0YXRpYyBtRmlsZTtcclxuICAgIHN0YXRpYyBzZXRBdXRvRmxhc2hcclxuICAgIHN0YXRpYyBtQ2FtZXJhRGV2aWNlU3RhdGVDYWxsYmFjaztcclxuICAgIHN0YXRpYyBSRVNVTFRfQ0FOQ0VMRUQgPSAwO1xyXG4gICAgc3RhdGljIFJFU1VMVF9PSyA9IC0xO1xyXG4gICAgc3RhdGljIFJFUVVFU1RfVklERU9fQ0FQVFVSRSA9IDk5OTtcclxuICAgIHN0YXRpYyBSRVFVRVNUX0NPREVfQVNLX1BFUk1JU1NJT05TID0gMTAwMDtcclxuICAgIHN0YXRpYyBPUklFTlRBVElPTl9VTktOT1dOID0gLTE7XHJcbiAgICBzdGF0aWMgUEVSTUlTU0lPTl9ERU5JRUQgPSAtMTtcclxuICAgIHN0YXRpYyBQRVJNSVNTSU9OX0dSQU5URUQgPSAwO1xyXG4gICAgc3RhdGljIE1BUlNITUFMTE9XID0gMjM7XHJcbiAgICBzdGF0aWMgY3VycmVudGFwaVZlcnNpb24gPSBhbmRyb2lkLm9zLkJ1aWxkLlZFUlNJT04uU0RLX0lOVDtcclxuICAgIHN0YXRpYyBtTWVkaWFSZWNvcmRlciA9IG5ldyBhbmRyb2lkLm1lZGlhLk1lZGlhUmVjb3JkZXIoKTtcclxuICAgIHN0YXRpYyBtTmV4dFZpZGVvQWJzb2x1dGVQYXRoID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgc3RhdGljIG1SZWNvcmRlclN1cmZhY2U7XHJcbiAgICBzdGF0aWMgbVByZXZpZXdCdWlsZGVyO1xyXG4gICAgc3RhdGljIHN1cmZhY2VzO1xyXG4gICAgLy9zdGF0aWMgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xyXG5cclxuICAgIHN0YXRpYyBTVEFURV9QUkVWSUVXID0gMDtcclxuICAgIHN0YXRpYyBTVEFURV9XQUlUSU5HX0xPQ0sgPSAxO1xyXG4gICAgc3RhdGljIFNUQVRFX1dBSVRJTkdfUFJFQ0FQVFVSRSA9IDI7XHJcbiAgICBzdGF0aWMgU1RBVEVfV0FJVElOR19OT05fUFJFQ0FQVFVSRSA9IDM7XHJcbiAgICBzdGF0aWMgU1RBVEVfUElDVFVSRV9UQUtFTiA9IDQ7XHJcbiAgICBzdGF0aWMgbVN0YXRlID0gY2xhc3Nlc1JlZi5TVEFURV9QUkVWSUVXO1xyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vZXhwb3J0IGNsYXNzIFROU1N1cmZhY2VUZXh0dXJlTGlzdG5lciBleHRlbmRzIGphdmEubGFuZy5PYmplY3QgaW1wbGVtZW50cyBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcuU3VyZmFjZVRleHR1cmVMaXN0ZW5lciB7XHJcbi8vICAgIHB1YmxpYyB0aGF0ID0gbmV3IFdlYWtSZWYodGhpcyk7XHJcbi8vICAgIHB1YmxpYyBtU3VyZmFjZVRleHR1cmVMaXN0ZW5lciA9ICgpID0+IG5ldyBhbmRyb2lkLnZpZXcuVGV4dHVyZVZpZXcuU3VyZmFjZVRleHR1cmVMaXN0ZW5lcih7XHJcbi8vICAgICAgICBvblN1cmZhY2VUZXh0dXJlQXZhaWxhYmxlOiAodGV4dHVyZSwgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4vLyAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvblN1cmZhY2VUZXh0dXJlQXZhaWxhYmxlJyk7XHJcbi8vICAgICAgICAgICAgdGhpcy50aGF0LmdldCgpLmNsYXNzZXNSZWYubVN1cmZhY2VUZXh0dXJlID0gdGV4dHVyZTtcclxuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xhc3Nlc1JlZi5tU3VyZmFjZVRleHR1cmUtLS0tLS0tLS0tLS0tJywgdGhhdC5nZXQoKS5jbGFzc2VzUmVmLm1TdXJmYWNlVGV4dHVyZSk7XHJcbi8vICAgICAgICAgICAgdGhpcy5jcmVhdGVDYW1lcmFQcmV2aWV3U2Vzc2lvbigpO1xyXG4vLyAgICAgICAgICAgIC8vIG9wZW5DYW1lcmEod2lkdGgsIGhlaWdodCk7XHJcbi8vICAgICAgICB9LFxyXG5cclxuLy8gICAgICAgIG9uU3VyZmFjZVRleHR1cmVTaXplQ2hhbmdlZDogKHRleHR1cmUsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuLy8gICAgICAgICAgICBjb25zb2xlLmxvZygnb25TdXJmYWNlVGV4dHVyZVNpemVDaGFuZ2VkJyk7XHJcbi8vICAgICAgICAgICAgLy8gY29uZmlndXJlVHJhbnNmb3JtKHdpZHRoLCBoZWlnaHQpO1xyXG4vLyAgICAgICAgfSxcclxuXHJcbi8vICAgICAgICBvblN1cmZhY2VUZXh0dXJlRGVzdHJveWVkOiAodGV4dHVyZSkgPT4ge1xyXG4vLyAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25TdXJmYWNlVGV4dHVyZURlc3Ryb3llZFwiKTtcclxuLy8gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgIH0sXHJcblxyXG4vLyAgICAgICAgb25TdXJmYWNlVGV4dHVyZVVwZGF0ZWQ6ICh0ZXh0dXJlKSA9PiB7XHJcbi8vICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJvblN1cmZhY2VUZXh0dXJVcGRhdGVkXCIpO1xyXG4vLyAgICAgICAgfSxcclxuXHJcbi8vICAgIH0pO1xyXG4vL30iXX0=
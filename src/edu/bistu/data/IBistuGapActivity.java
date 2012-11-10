package edu.bistu.data;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class IBistuGapActivity extends DroidGap {

//	private final int SPLASH_DISPLAY_LENGHT = 5000;
//
//	/** Called when the activity is first created. */
//	@Override
//	public void onCreate(Bundle savedInstanceState) {
//		super.onCreate(savedInstanceState);
//		
//		getWindow().clearFlags(
//				WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);// 清除FLAG
//		requestWindowFeature(Window.FEATURE_NO_TITLE);
//		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
//				WindowManager.LayoutParams.FLAG_FULLSCREEN);
//		
//		setContentView(R.layout.splash);
//		new Handler().postDelayed(new Runnable() {
//			
//			public void run() {
//				Intent mainIntent = new Intent(IBistuGapActivity.this, MainActivity.class);
//				IBistuGapActivity.this.startActivity(mainIntent);
//				IBistuGapActivity.this.finish();
//			}
//
//		}, SPLASH_DISPLAY_LENGHT);
//        
//	}
	
	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        //super.setIntegerProperty("loadUrlTimeoutValue", 60000);
        super.setIntegerProperty("splashscreen",R.drawable.load);
        super.loadUrl("file:///android_asset/www/index.html",10000);
        
    }
	
	
}
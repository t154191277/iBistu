package edu.bistu.data;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class MainActivity extends DroidGap {
	
	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        super.setIntegerProperty("loadUrlTimeoutValue", 60000);
//        super.setIntegerProperty("splashscreen",R.drawable.load);
        super.loadUrl("file:///android_asset/www/init.html");
        
    }
	
}

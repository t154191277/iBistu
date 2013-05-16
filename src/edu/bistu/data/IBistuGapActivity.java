package edu.bistu.data;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class IBistuGapActivity extends DroidGap {

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        super.setIntegerProperty("splashscreen",R.drawable.load);
        super.loadUrl(Config.getStartUrl(), 10000);
    }
}
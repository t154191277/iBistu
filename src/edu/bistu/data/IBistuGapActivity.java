package edu.bistu.data;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;

public class IBistuGapActivity extends Activity {

	private final int SPLASH_DISPLAY_LENGHT = 5000;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		getWindow().clearFlags(
				WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);// 清除FLAG
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		
		setContentView(R.layout.splash);
		new Handler().postDelayed(new Runnable() {

			@Override
			public void run() {
				Intent mainIntent = new Intent(IBistuGapActivity.this, MainActivity.class);
				IBistuGapActivity.this.startActivity(mainIntent);
				IBistuGapActivity.this.finish();
			}

		}, SPLASH_DISPLAY_LENGHT);

	}
}
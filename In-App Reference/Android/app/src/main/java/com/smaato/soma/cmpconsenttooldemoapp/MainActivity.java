package com.smaato.soma.cmpconsenttooldemoapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.CMPConsentToolActivity;
import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.callbacks.OnCloseCallback;
import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model.CMPSettings;
import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.model.SubjectToGdpr;
import com.smaato.soma.cmpconsenttooldemoapp.cmpconsenttool.storage.CMPStorage;

public class MainActivity extends AppCompatActivity {

    private TextView gdprInfoTextView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button gdprButton = findViewById(R.id.gdpr_button);
        gdprInfoTextView = findViewById(R.id.gdpr_info_text_view);

        gdprButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CMPStorage.setCmpPresentValue(MainActivity.this, true);
                CMPSettings cmpSettings = new CMPSettings(SubjectToGdpr.CMPGDPREnabled, "https://demofiles.smaato.com/cmp/index.html", null);

                CMPConsentToolActivity.openCmpConsentToolView(cmpSettings, MainActivity.this, new OnCloseCallback() {
                    @Override
                    public void onWebViewClosed() {
                        Toast.makeText(MainActivity.this, "Got consent", Toast.LENGTH_LONG).show();

                        gdprInfoTextView.setText(getGdprInfo());
                    }
                });
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        gdprInfoTextView.setText(getGdprInfo());
    }

    private String getGdprInfo() {
        return String.format("consentString: %s\nvendors: %s\npurposes: %s\nsubjectToGDPR: %s",
                CMPStorage.getConsentString(this),
                CMPStorage.getVendorsString(this),
                CMPStorage.getPurposesString(this),
                CMPStorage.getSubjectToGdpr(this));
    }
}
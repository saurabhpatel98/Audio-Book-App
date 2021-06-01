package com.almosteverything.booksummaries.podcasts.audiobooksapp;

import android.content.Context;
import android.content.Intent;

import androidx.annotation.NonNull;

import io.appgain.sdk.controller.AppgainPushReceiver;
import io.appgain.sdk.model.push.ReceiveStatus;


public class PushReceiver extends AppgainPushReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
    }

    @Override
    protected void onReceive(Context context, ReceiveStatus receiveStatus, Intent intent) {

    }

    @Override
    protected void onSilentPushReceive(@NonNull String operation) {
        super.onSilentPushReceive(operation);
    }
}

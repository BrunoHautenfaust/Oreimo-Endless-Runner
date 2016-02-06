namespace EVAWinForms
{
    using System;
    using System.IO;
    using System.Media;
    using System.Windows.Forms;

    public class Eva
    {
        private bool batteryPresentNotified = false;
        private bool powerOfflineNotified = false;
        private bool powerOnlineNotified = false;
        private bool batteryRechargedNotified = false;
        private bool batteryChargingNotified = false;
        private bool lowPowerNotified = false;

        private SoundPlayer soundPlayer;
        private Timer timer;
        private PowerStatus powerStatus = SystemInformation.PowerStatus;

        public Eva(SoundPlayer sp, Timer t)
        {
            soundPlayer = sp;
            timer = t;
            timer.Interval = 1000;
            timer.Enabled = true;

            timer.Tick += timer1_Tick;
        }

        private void CheckBatteryStatus()
        {

            if (powerStatus.PowerLineStatus == PowerLineStatus.Offline)
            {
                if (powerOfflineNotified == false)
                {
                    this.Inform(Commands.Offline);
                    powerOfflineNotified = true;
                }
                if (powerStatus.BatteryLifePercent < 0.1 && lowPowerNotified == false)
                {
                    this.Message(Commands.Message1);
                    this.Inform(Commands.Low_Power);
                    lowPowerNotified = true;
                }
                // Online reset
                powerOnlineNotified = false;
                batteryChargingNotified = false;
                batteryRechargedNotified = false;
            }
            else if (powerStatus.PowerLineStatus == PowerLineStatus.Online)
            {
                if (powerStatus.BatteryChargeStatus == BatteryChargeStatus.NoSystemBattery && batteryPresentNotified == false)
                {
                    this.Message(Commands.Message1);
                    this.Inform(Commands.Power_Unit_Unavailable);
                    batteryPresentNotified = true;
                    powerOnlineNotified = false;
                    batteryChargingNotified = false;
                }
                else if (powerStatus.BatteryChargeStatus != BatteryChargeStatus.NoSystemBattery)
                {
                    if (powerOnlineNotified == false)   // maybe set to true initially?
                    {
                        this.Inform(Commands.Online);
                        powerOnlineNotified = true;
                    }
                   
                    if ( (powerStatus.BatteryChargeStatus.ToString() == "High, Charging" ||
                            powerStatus.BatteryChargeStatus.ToString() == "Low, Charging" ||
                            powerStatus.BatteryChargeStatus.ToString() == "Critical, Charging" ||
                            powerStatus.BatteryChargeStatus == BatteryChargeStatus.Charging) &&
                         batteryChargingNotified == false)
                    {
                        this.Inform(Commands.Charging);
                        batteryChargingNotified = true;
                    }
                    if (powerStatus.BatteryLifePercent == 1 && batteryRechargedNotified == false)
                    {
                        this.Inform(Commands.Unit_Recharged);
                        batteryRechargedNotified = true;
                    }

                    batteryPresentNotified = false;

                }
                // Offline reset
                powerOfflineNotified = false;
                lowPowerNotified = false;
            }
        }

        private void Message(Stream command)
        {
            command.Position = 0;
            soundPlayer.Stream = command;
            soundPlayer.PlaySync();
        }

        private void Inform(Stream command)
        {
            command.Position = 0;
            soundPlayer.Stream = command;
            soundPlayer.Play();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            CheckBatteryStatus();
        }
    }
}
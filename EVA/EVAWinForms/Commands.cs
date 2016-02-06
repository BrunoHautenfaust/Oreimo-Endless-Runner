namespace EVAWinForms
{
    using System.IO;

    public static class Commands
    {
        private static Stream message1 = Properties.Resources.message1;
        private static Stream online = Properties.Resources.power_online;
        private static Stream offline = Properties.Resources.power_offline;
        private static Stream low_power = Properties.Resources.low_power;
        private static Stream charging = Properties.Resources.charging;
        private static Stream unit_recharged = Properties.Resources.unit_recharged;
        private static Stream power_unit_unavailable = Properties.Resources.power_unit_unavailable;

        public static Stream Message1 { get { return message1; } }
        public static Stream Online { get { return online; } }
        public static Stream Offline { get { return offline; } }
        public static Stream Low_Power { get { return low_power; } }
        public static Stream Charging { get { return charging; } }
        public static Stream Unit_Recharged { get { return unit_recharged; } }
        public static Stream Power_Unit_Unavailable { get { return power_unit_unavailable; } }
    }
}
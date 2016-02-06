namespace EVAWinForms
{
    using System;
    using System.Windows.Forms;
    using System.Diagnostics;

    public partial class AboutUserControl : UserControl
    {
        public AboutUserControl()
        {
            InitializeComponent();
        }

        private void authorLabel_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            Process.Start("https://github.com/BrunoHautenfaust");
        }

        private void okButton_Click(object sender, EventArgs e)
        {
            this.Hide();
        }

    }
}

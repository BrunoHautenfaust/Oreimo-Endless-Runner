namespace EVAWinForms
{
    partial class AboutUserControl
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.messageLabel = new System.Windows.Forms.Label();
            this.authorLabel = new System.Windows.Forms.LinkLabel();
            this.okButton = new System.Windows.Forms.Button();
            this.notificationsLabel = new System.Windows.Forms.Label();
            this.notificationsInfoLabel = new System.Windows.Forms.Label();
            this.gameLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // messageLabel
            // 
            this.messageLabel.AutoSize = true;
            this.messageLabel.Font = new System.Drawing.Font("Lucida Console", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel, ((byte)(204)));
            this.messageLabel.ForeColor = System.Drawing.Color.ForestGreen;
            this.messageLabel.Location = new System.Drawing.Point(34, 9);
            this.messageLabel.Name = "messageLabel";
            this.messageLabel.Size = new System.Drawing.Size(199, 56);
            this.messageLabel.TabIndex = 2;
            this.messageLabel.Text = "For the millions of\r\n\r\n fans around the world\r\n I got a present for ya!";
            this.messageLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // authorLabel
            // 
            this.authorLabel.AutoSize = true;
            this.authorLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.authorLabel.LinkColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.authorLabel.Location = new System.Drawing.Point(183, 65);
            this.authorLabel.Name = "authorLabel";
            this.authorLabel.Size = new System.Drawing.Size(79, 17);
            this.authorLabel.TabIndex = 5;
            this.authorLabel.TabStop = true;
            this.authorLabel.Text = "The Author";
            this.authorLabel.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.authorLabel_LinkClicked);
            // 
            // okButton
            // 
            this.okButton.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.okButton.ForeColor = System.Drawing.Color.ForestGreen;
            this.okButton.Location = new System.Drawing.Point(102, 183);
            this.okButton.Name = "okButton";
            this.okButton.Size = new System.Drawing.Size(75, 23);
            this.okButton.TabIndex = 4;
            this.okButton.Text = "OK";
            this.okButton.UseVisualStyleBackColor = true;
            this.okButton.Click += new System.EventHandler(this.okButton_Click);
            // 
            // notificationsLabel
            // 
            this.notificationsLabel.AutoSize = true;
            this.notificationsLabel.BackColor = System.Drawing.Color.Transparent;
            this.notificationsLabel.Font = new System.Drawing.Font("Lucida Console", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.notificationsLabel.ForeColor = System.Drawing.Color.Lime;
            this.notificationsLabel.Location = new System.Drawing.Point(3, 100);
            this.notificationsLabel.Name = "notificationsLabel";
            this.notificationsLabel.Size = new System.Drawing.Size(257, 12);
            this.notificationsLabel.TabIndex = 7;
            this.notificationsLabel.Text = "You will receive notifications when:";
            // 
            // notificationsInfoLabel
            // 
            this.notificationsInfoLabel.AutoSize = true;
            this.notificationsInfoLabel.Font = new System.Drawing.Font("Lucida Console", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel, ((byte)(204)));
            this.notificationsInfoLabel.ForeColor = System.Drawing.Color.LightGreen;
            this.notificationsInfoLabel.Location = new System.Drawing.Point(7, 121);
            this.notificationsInfoLabel.Name = "notificationsInfoLabel";
            this.notificationsInfoLabel.Size = new System.Drawing.Size(250, 48);
            this.notificationsInfoLabel.TabIndex = 6;
            this.notificationsInfoLabel.Text = "- AC adapter is plugged/unplugged\r\n- battery is available/unavailable\r\n- battery " +
    "is charging/fully charged\r\n- battery charge is low (below 10%)";
            // 
            // gameLabel
            // 
            this.gameLabel.AutoSize = true;
            this.gameLabel.Font = new System.Drawing.Font("Lucida Console", 14F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Pixel, ((byte)(204)));
            this.gameLabel.ForeColor = System.Drawing.Color.ForestGreen;
            this.gameLabel.Location = new System.Drawing.Point(46, 22);
            this.gameLabel.Name = "gameLabel";
            this.gameLabel.Size = new System.Drawing.Size(178, 14);
            this.gameLabel.TabIndex = 8;
            this.gameLabel.Text = "Command and Conquer";
            this.gameLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // AboutUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.Controls.Add(this.gameLabel);
            this.Controls.Add(this.notificationsLabel);
            this.Controls.Add(this.notificationsInfoLabel);
            this.Controls.Add(this.authorLabel);
            this.Controls.Add(this.okButton);
            this.Controls.Add(this.messageLabel);
            this.Name = "AboutUserControl";
            this.Size = new System.Drawing.Size(274, 218);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label messageLabel;
        private System.Windows.Forms.LinkLabel authorLabel;
        private System.Windows.Forms.Button okButton;
        private System.Windows.Forms.Label notificationsLabel;
        private System.Windows.Forms.Label notificationsInfoLabel;
        private System.Windows.Forms.Label gameLabel;
    }
}

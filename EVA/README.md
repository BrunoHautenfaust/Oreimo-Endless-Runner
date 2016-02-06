# EVA
### Battery Monitor Application for Windows

  If you're a fan of Command & Conquer, then you're gonna love this. With this application you will receive voice notifications when:
- AC adapter is plugged/unplugged
- battery is available/unavailable
- battery is charging/fully charged
- battery charge is low (below 10%)

For those of you who don't know, **Command & Conquer** is a popular RTS game. EVA stands for *Electronic Video Agent*.
It's an AI that's keeping you posted of everything that happens on the battlefield.

---

#### ***Note:***
Even though .NET has a *PowerModeChangedEventHandler*, I used a timer. Why, you might ask?

  Because PowerModeChangedEventHandler is buggy. The event fires twice and it behaves differently on different versions of Windows.
I've tested it on XP, 7, 8 and 10. I think the event handler works best on XP because the event is supposed to fire when there's a 
change in the power mode(which happens at a ~10 seconds interval). The power mode is something that most of the time varies constantly.
The following is taken from the public enum PowerModes in Microsoft.Win32 namespace:

        // Summary:
        //     A power mode status notification event has been raised by the operating system.
        //     This might indicate a weak or charging battery, a transition between AC power
        //     and battery, or another change in the status of the system power supply.

All in all, I had no choice. I used a timer because I wanted a program that would work normally under all (or at least most)
versions of Windows.
But don't worry! The program doesn't hog your CPU.

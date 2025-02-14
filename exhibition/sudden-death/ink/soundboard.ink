/* this is where the sounds live */


== SFX(filename) // general purpose stuff idk if i'll use it due to i dont think any of these sounds are mixed/equalised lol
#playSound: {filename}
-> DONE


/* coin flip */

== coinUp
#playSound: coin-up
->DONE

== coinDown
#playSound: coin-down
->DONE

/* tackles */

== tackle1
#playSound: tackle-1
->DONE

== tackle2
#playSound: tackle-2
->DONE

/* kicks */

== kick1
#playSound: kick-1
->DONE

== kick2
#playSound: kick-2
->DONE

== kick3
#playSound: kick-3
->DONE

== kick4
#playSound: kick-4
->DONE

== kick5
#playSound: kick-5
->DONE

== kick6
#playSound: kick-6
->DONE

== kick7
#playSound: kick-7
->DONE

== ovalkick1
#playSound: oval-kick-1
->DONE

== ovalkick2
#playSound: oval-kick-2
->DONE

== ovalkick3
#playSound: oval-kick-3
->DONE

== ovalkick4
#playSound: oval-kick-4
->DONE

/* whistles */

== whistle1
#playSound: whistle-1
->DONE

== whistle2
#playSound: whistle-2
->DONE

== whistle3
#playSound: whistle-3 >> volume: 0.8
->DONE


/* crowd sounds */

== crowdAmbiance 
#playSound: crowd-ambience >> loop:true, volume: 1
->DONE

== crowdAw1
#playSound: crowd-awww-1
->DONE

== crowdAw2
#playSound: crowd-awww-2
->DONE

== crowdBoo1
#playSound: crowd-boo-1
->DONE

== crowdBoo2
#playSound: crowd-boo-2
->DONE

== crowdCheer1
#playSound: crowd-cheer-1
->DONE

== crowdCheer2
#playSound: crowd-cheer-2
->DONE

== crowdCheer3
#playSound: crowd-cheer-3
->DONE

== crowdClap
#playSound: crowd-clap-1
->DONE

== crowdComeOn
#playSound: crowd-come-on-1
->DONE

== crowdEdging
#playSound: crowd-edging-1
->DONE

== crowdGasp
#playSound: crowd-gasp-1
->DONE

== crowdOoo
#playSound: crowd-ooo-1
->DONE

== crowdWoah
#playSound: crowd-woah-1
->DONE

== crowdYes
#playSound: crowd-yesss-1
->DONE

/* misc */

== gulls2
#playSound: gulls2 >> loop: true
->DONE

== injection
#playSound: injection >> volume: 0.5
->DONE

== slap
#playSound: slap
->DONE

== slam
#playSound: slam >> volume: 0.2
->DONE

== siren
#playSound: siren 
#delay: 1000
#stopSound: siren >> fade: 2000
->DONE

== soundChat ==
#playSound: feed
	->DONE

INCLUDE shortcuts.ink
INCLUDE soundboard.ink
INCLUDE images.ink
INCLUDE sprites.ink

->menu

== menu ==
#stopAllSounds
#removeContainer: quotecard 
#clear
#jReset
#setContainer: menu
#addImage: sd-logo-inverted >> name: menucrest
Welcome to the exhibition version of cecile richard & nat_pussy's gay sports visual novel <strong>SUDDEN DEATH</strong>.
+ [Start Demo] ->start ->demostart
+ [Characters] ->jcharacters
+ [Credits] ->jcredits

== jcredits ==
#jEvent: lookatCredits >> action:run
->DONE

== jcharacters ==
#jEvent: characterSheet >> action:run
->DONE

== welcome ==
#jEvent: welcomeScreen >> action:run
->DONE

== demostart ==
#removeAllImages: canvas
#removeContainer: menu
#jEvent: closeAll >> action:run
->welcome

== openArticle ==
#jWindow: article1 >> action:open
->DONE

== origins ==
#removeAllImages: canvas
#removeContainer: menu
#jEvent: closeAll >> action:run
#delay:1000
<-bgInterview
#delay:1000
<-startScene

<-TopRight("mitch-old-neutral")
<-toInkwindow
MITCH — ‘There's this... typo. In our dressing room, right? On the wall. Right above the spot where my locker was.

<-TopRight("mitch-old-smile")
<-toInkwindow
It says... ‘YOUR A PROFESSIONAL, “KEEP IT SIMPLE”’.

<-TopRight("mitch-old-laugh")
<-toInkwindow
Your a professional. Like Y-O-U-R as in YOUR jumper or whatever. Not Y-O-U-apostrophe-R-E as in YOU ARE.

<-TopRight("mitch-old-neutral")
<-toInkwindow
I guess it's more of a grammatical mistake, but I mean, I ain't paid to know the difference, am I?

<-kick1
But I noticed, you know. I thought it was funny.

<-kick1
I think... I think I’m the only one who ever noticed it.’

<-kick2
INTERVIEWER — ‘Uhm... right. You were telling me about this, the ‘juice’?’

<-TopRight("mitch-old-smile")
<-TopRightEffect("mitch-sweat")
<-toInkwindow
MITCH — ‘Yeah, yeah. Anyway, Jordy... Jordan. He was the one who first brought the Juice to me and Shiv.

<-kick1
He had been taking it for about two, three weeks--leapt from average guy to superstar-level--and was all "See, I'm demonstrably more performant with this, and I can tell you right now this is what they all do in the Unlimited League'.

<-kick1
He had this... weird, fuckin' weird, method to cheating. The lengths he'd go to find loopholes to exploit. Meticulous, you know. Scientist-like.

<-TopRight("mitch-old-neutral")
<-toInkwindow
Fuck knows where he found that shit. In hindsight I realise it would have been best practice to ask, hey Jordy where'd you get this shit...? Doesn't really matter now obviously, but...

<-TopRight("mitch-old-smile")
<-toInkwindow
But, I don't know. Truth is, I had complete trust in the man. 

<-kick1
He tells me to jump, I ask how high.

<-TopRight("mitch-old-smile")
<-toInkwindow
He tells me to shoot myself... well, darl, would you rather I put the bullet in my head or in my heart?

<-kick1
I know, I know. You're thinking ‘Oh, how could you be so reckless, you were the captain for fuck's sake’. Yeah. Ha.

<-kick1
That's just how it was in those times. It felt right, you know. It felt righteous, too. Showing all them corpo bastards and rich cunts and all that. And we owed it to Shiv and we owed it to the fans. And I mean...

<-kick1
I mean you saw me. You saw us on the field then.

<-TopRight("mitch-old-neutral")
<-toInkwindow
If Jordan told me to shoot myself, I’d beg him to shoot me in the fucking heart. 

<-TopRight("mitch-old-smile")
<-toInkwindow
That’s it, really. I was head over heels for him.’

<-removeTopRight
<-removeBg
#stopSound: hum
<-removeInkwindow
->openArticle

== pregame ==
#jEvent: closeAll >> action:run
#removeAllImages: canvas
<-bgTrouble
<-replaceBg("bg-lockerroom2")
#delay:1000
<-setInkwindow
<-clear

I’ve never been good at speeches, although people generally tend to tell me otherwise. 

My self-perception always seems a little off-centre of what other people see me as.

Being a captain means you have to do a pre-game speech and sound like you believe what you're saying...

...So you might as well believe in what you're saying.

For the first time in fucking ages, Bazza has a resolved expression on his face. And Lucky seems fired up as ever. The rest of the team seems determined too. We’ve got this. We’ve got this. We’ve got this.

I take one last look at the dressing room. I look at that mural again.

//maybe change bg to a close up of that

YOUR A PROFESSIONAL.<br>“KEEP IT SIMPLE”

<-clear

#playSound: stadium-enter >> volume: 0.5
<-replaceBg("bg-tunnel")

We walk through the tunnel leading to the field. The air is buzzing with electricity. 

From here, the crowd cheering is a low rumbling that you feel in your guts.

I glance at Jordan, walking next to me. His eyes lock with mine. 

#fadeSound: stadium-enter >> fade:1000, volume: 1
He smiles; in the half-shade of the tunnel, it looks like a real smile.

<-removeBg
<-removeInkwindow

->fadetoBlack ->cointoss

== cointoss ==

<-clear
#setContainer: quotecard
Much of the appeal of sport derives from its dependence on elegant gibberish. #continue #delay: 2000
<span id="quoted">— Don DeLillo, *End Zone*, 1972</span>  #animClass: animFadeIn >> target:quoted, time:1000, skippable:false, wait:false, remove:false #continue
#delay: 5000 >> skippable: true 
<-clear
#removeContainer: quotecard

<-startTitlecard
<-crowdAmbiance 
<-whistle1
QUALIFYING FINAL #continue #delay: 2000
<-clear
#delay: 1000
EAST GLENVALE PIKERS<br>V<br>BUNDANYABBA HOUNDS #continue #delay: 2000
<-endTitlecard

<-chapter("chap7.png")
<-bgScreenplay
#delay: 2000
<-setMatch
SCENE<1. EXT. FIELD, CENTRE SQUARE. NIGHT.>

<-setGamescreen("sp-centresquare")

Wide shot. Seagulls circle over the oval, eyeing spectators’ food. The seagulls are, in a sense, spectators too.

MITCHELL CARRAWAY from the Pikers, PARKER PATERNOSTER from the Hounds, and the FIELD UMPIRE stand in the centre square. The field umpire holds out a coin.

Close up of the coin as the field umpire shows both sides of it to the captains of each team.

HEADS: a portrait of the Queen in profile.
TAILS: 'One Dollar' and a hopping marsupial.

ACTOR<SHIV (V/O)> #continue
LINE<This game always starts with a coin toss.>
LINE<It serves as a reminder that pounds of preloaded muscle, intricate strategising, years of hard work and generational flashes of sheer football genius... are all ultimately meaningless.>
LINE<This game is, when you pull back and examine it in its pure form, a game of chance.>
LINE<The coin toss symbolises pure luck, the real and implacable decider for who wins and who loses.>
LINE<It also symbolises a quick and unequivocal way to decide which side of the oval each team will kick their goals.>

ACTOR<FIELD UMPIRE> #continue
LINE<Carraway, your call.>
LINE<Heads or tails?>

ACTOR<MITCH> #continue
LINE<Heads.>

ACTOR<FIELD UMPIRE> #continue
LINE<Alright, heads for Carraway, let’s get on with the toss. Good luck Carraway, good luck Parker.>

#playSound: coin-up
The field umpire tosses the coin. The camera pans as it follows the coin in slow motion, following the gaze of the three men watching it arc into the dark sky... and land in the grass below.

#playSound: coin-down
Medium close-up shot. The umpire checks the result, picks up the coin, and signals to both captains where their homes are for the quarter.

#removeImage: chap7.png
<-clear

<-setGamescreen("sp-banner")
#delay: 1000
<-setChyron
<PIK>:<0> <HOU>:<0> <TIME>:<00:00> <QUARTER>:<START> #continue #delay: 1000
<-setHeatmap("heatmap")
#delay: 1000
<-setScoreworm("scoreworm")
#delay: 1000
<-setPressure("pressuregauge")
#delay: 2000

->firstquarter

== firstquarter ==

<-startTitlecard
<-whistle1
FIRST QUARTER #continue #delay: 3000
<-endTitlecard

<-bgScreenplay
#playSound: karate >> loop:true, volume: 1
<-crowdAmbiance

<-setHeatmap("heatmap-anim")
<-setScoreworm("scoreworm")
<-setPressure("pressuregauge-q1")

<-setGamescreen("sp-crowd")
<-setChyron
<PIK>:<8> <HOU>:<0> <TIME>:<22:12> <QUARTER>:<1ST> #continue
<-setMatch
SCENE<2. EXT. STADIUM SEATING BAY.>

Twenty-two minutes left in the first quarter.

Wide panning shot of the spectators. Clad in beanies and scarves adorned with the garish colours of either team, they cheer, they boo, they drink beer, they speak among each other about the game and about their lives. 

Some of them are long-time friends and long-time fans of the sport. For others, this is the first time they see a game of football in person; it could be their first of many, or their very last. 

Medium close-up. As the camera pans from left to right, we are introduced to two mothers and their two children. One mother is in Hounds colours, the other is in Pikers colours. The children are divided along the same lines. The child with the Pikers jersey looks overjoyed, while the child with the Hounds jersey looks bored.

<-clear

<-setGamescreen("sp-radiobox")
SCENE<3. INT. COMMENTARY BOX.>

<-setChyron
<PIK>:<18> <HOU>:<1> <TIME>:<09:03> <QUARTER>:<1ST> #continue
<-setMatch

Nine minutes left in the first quarter.

Medium close-up shot of two radio broadcasters, RICHO and LUCE, sitting at their desk. There are many screens around them with elaborate stats and a live feed of the events unfolding on the ground.

ACTOR<RICHO> #continue
LINE<...and the Pikers are absolutely fearsome in this first quarter, dominating the game at the moment with three goals.>

ACTOR<LUCE> #continue
LINE<The Hounds just don’t seem to be able to capitalise on the few times they do get possession. Here’s Bowie again, he handballs to Steele...>
<-ovalkick1
LINE<...who launches it towards the Yabba’s inside fifty...>

ACTOR<RICHO> #continue
<-crowdGasp
<-crowdWoah
LINE<And Leung takes the mark!>

<-clear

<-setGamescreen("sp-goals")
SCENE<4. EXT. FIELD.>

Medium shot. JORDAN LEUNG takes a deep breath and gets ready to kick.

<-ovalkick2
Close-up shot. The kick itself is obscured. 

The camera lingers on Jordan’s expression as it shifts from apprehensive focus to a satisfied grin. 

<-crowdCheer1
He pumps his fist and turns around to celebrate with his teammates who give him pats on the back. 

<-setChyron
<PIK>:<24> <HOU>:<2> <TIME>:<08:19> <QUARTER>:<1ST> #continue
<-setMatch

ACTOR<JORDAN> #continue
LINE<Fuck yeah! (LAUGHS)>

ACTOR<LUCKY> #continue
LINE<(SHOUTING) Let’s go bro!>

Mitch appears from out of frame and ruffles his hair.

ACTOR<JORDAN> #continue
LINE<Onya Jordy.>

<-clear

<-setGamescreen("sp-crowd")
SCENE<5. EXT. FIELD.>

<-setChyron
<PIK>:<24> <HOU>:<2> <TIME>:<02:01> <QUARTER>:<1ST> #continue
<-setMatch

Two minutes left in the first quarter.

One of the mothers, the Hounds fan, stands up.

ACTOR<HOUNDS FAN MOTHER> #continue
LINE<I’m gonna get something to eat, what would you like?>

ACTOR<BOTH KIDS> #continue
LINE<Chippies!>

ACTOR<HOUNDS FAN MOTHER> #continue
LINE<How about you, babe?>

ACTOR<PIKERS FAN MOTHER> #continue
LINE<Sausage roll. (SMILES) Thanks darl.>

The Hounds-aligned mother makes her way through the narrow space between seats and disappears into the concession stands.

#playSound: siren 
Off-screen, the siren sounds, signalling the end of the first quarter.
#stopSound: siren >> fade: 2000

<-setChyron
<PIK>:<24> <HOU>:<2> <TIME>:<00:00> <QUARTER>:<QT> #continue
<-setMatch
<-setScoreworm("scoreworm-q1")

The Pikers lead the Hounds, 24 to 2.

<-clear
#pauseSound: karate >> fade: 1000

->secondquarter

== secondquarter ==

<-startTitlecard
<-whistle1
SECOND QUARTER #continue #delay: 3000
<-endTitlecard

<-bgScreenplay
#playSound: karate >> loop: true, volume: 1
<-crowdAmbiance

<-setHeatmap("heatmap-anim")
<-setScoreworm("scoreworm-q1")
<-setPressure("pressuregauge-q2")

<-setGamescreen("sp-lowangle")

<-setMatch
SCENE<6. EXT. FIELD.>

<-setChyron
<PIK>:<24> <HOU>:<2> <TIME>:<23:11> <QUARTER>:<2ND> #continue
<-setMatch

Slow-motion montage of the Pikers kicking more goals. 

<-setChyron
<PIK>:<30> <HOU>:<2> <TIME>:<19:13> <QUARTER>:<2ND> #continue
<-setMatch

<-setGamescreen("sp-closeup4")

A succession of images: muscles extending, hands on torsos, hands in hair, hands on the ball.

<-setChyron
<PIK>:<36> <HOU>:<2> <TIME>:<17:20> <QUARTER>:<2ND> #continue
<-setMatch

<-setGamescreen("sp-tackle2")

<-tackle1
Body against body against body, again and again and again.

<-setChyron
<PIK>:<42> <HOU>:<2> <TIME>:<15:53> <QUARTER>:<2ND> #continue
<-setMatch

Fifteen minutes left in the second quarter.

<-setChyron
<PIK>:<48> <HOU>:<2> <TIME>:<13:53> <QUARTER>:<2ND> #continue
<-setMatch

<-setGamescreen("sp-lowangle")

Wide shot of the field at ground-level, from Shiv’s perspective as she stands in the shelter behind the boundary line. Reverse medium shot. She’s crossing her arms, watching the game unfold under her eyes. 

She’s smiling.

On the other side, much higher up in the coach box behind a glass panel, the Hounds’ coach yells inaudibly into a telephone.

<-clear

<-crowdClap

<-setGamescreen("sp-radiobox")

SCENE<7. INT. STADIUM COMMENTARY BOX.>

<-setChyron
<PIK>:<48> <HOU>:<8> <TIME>:<12:26> <QUARTER>:<2ND> #continue
<-setMatch

Twelve minutes left in the second quarter. 

The Hounds just scored their first goal after almost a half-hour of inaction. The ball gets reset and the game continues.

ACTOR<LUCE> #continue
LINE<...who is a true pioneer, a legend of the game, and has come from very far away to lift this Pikers team up from the proverbial gutter.>

ACTOR<RICHO> #continue
LINE<You’re absolutely right Luce, it’s truly impressive stuff. Paternoster gets possession of the ball. Will the Hounds be able to build their momentum after scoring their first goal of the quarter just forty seconds ago?>

ACTOR<LUCE> #continue
LINE<Willard to De Santiago... and Bartlett-Shields attempts to spoil... but can’t materialise it. Hounds young gun O’Reilly takes the mark and he will try to kick his first goal tonight.>

A moment passes...

<-setChyron
<PIK>:<48> <HOU>:<14> <TIME>:<11:02> <QUARTER>:<2ND> #continue
<-setMatch
<-ovalkick4
<-crowdCheer3
...and then as O’Reilly kicks square between the goal posts, the crowd roars anew. 

The rumbling makes the commentary box shake slightly.

ACTOR<RICHO> #continue
LINE<And he scores! What a beauty! Look at him celebrating! A beautiful banana kick from O’Reilly, who’s just nineteen and is playing his first...>

<-clear

<-setGamescreen("sp-crowd")

SCENE<8. EXT. STADIUM SEATING BAY.>

<-setChyron
<PIK>:<48> <HOU>:<15> <TIME>:<09:39> <QUARTER>:<2ND> #continue
<-setMatch

The family is eating their snacks. The kid wearing the Hounds jersey is now a lot more interested in what’s happening out on the field.

<-setChyron
<PIK>:<48> <HOU>:<21> <TIME>:<07:58> <QUARTER>:<2ND> #continue
<-setMatch

A seagull lands nearby, watching them eat.

<-clear

<-setGamescreen("sp-massage")

SCENE<9. EXT. FIELD.>

Hard cut to Mitch lying on his back. His thick upper thigh is oiled up and getting massaged by a team physiotherapist.

<-setChyron
<PIK>:<48> <HOU>:<27> <TIME>:<06:14> <QUARTER>:<2ND> #continue
<-setMatch

Six minutes left in the second quarter. 

The Hounds have scored a series of goals after O’Reilly broke the game open, shortening the Pikers’ lead. Shiv walks up to Mitch.

ACTOR<MITCH> #continue
LINE<Yeah, we ain’t looking too good out there...>

ACTOR<SHIV> #continue
LINE<Yeah. There’s holes in our defence. Will address that at half-time. For now, we need to break up their momentum, and keep scoring in the meantime.>

<-clear

<-setGamescreen("sp-crowd")

SCENE<10. EXT. STADIUM SEATING BAY.>

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<00:10> <QUARTER>:<2ND> #continue
<-setMatch

Ten seconds left in the quarter.

The seagull steals a chip from the child wearing a Pikers jersey, before it gets shooed away by a security officer.

#playSound: siren 
Off-screen, the siren sounds, signalling the end of the second quarter.
#stopSound: siren >> fade: 2000

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<00:00> <QUARTER>:<QT> #continue
<-setMatch

<-setScoreworm("scoreworm-q2")

Pikers lead the Hounds, 52 to 23.

#stopAllSounds

<-startTitlecard
<-whistle2
HALF TIME #continue #delay: 2000
<-endTitlecard

#playSound: crowd-ambience >> volume: 0.1

<-setGamescreen("sp-lockerroom")

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<00:00> <QUARTER>:<HT> #continue
<-setMatch

<-setScoreworm("scoreworm-q2")

SCENE<11. INT. PIKERS CHANGING ROOM.>

Wide shot of the Pikers juicing up wordlessly. 

There is a solemn sense of tension in the air.

Shiv watches in a corner, stoic as always.

#stopAllSounds

->thirdquarter

== thirdquarter ==

<-startTitlecard
<-whistle1
THIRD QUARTER #continue #delay: 2000
<-endTitlecard

<-bgScreenplay
#playSound: hyper >> volume: 1
<-crowdAmbiance

<-setHeatmap("heatmap-anim")
<-setScoreworm("scoreworm-q2")
<-setPressure("pressuregauge-q3")

<-setGamescreen("sp-radiobox")

<-setMatch
SCENE<12. INT. COMMENTARY BOX.>

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<19:45> <QUARTER>:<3RD> #continue
<-setMatch

Nineteen minutes left in the third quarter.

ACTOR<LUCE> #continue
LINE<...and Bowie to Fields. Now the Pikers are holding on, but they have slowed down considerably. When you look at the pressure gauge here, they have significantly fallen off compared to their explosive performance in the first half of the game.>

ACTOR<RICHO> #continue
LINE<I believe Kowalczyk would have given them a stern speech at half time.>

ACTOR<LUCE> #continue
LINE<Wouldn’t want to be at the receiving end of that. (LAUGHS)>

ACTOR<RICHO> #continue
LINE<I would. I like older women, especially when they look disappointed at me--\> 
<-tackle1
<-crowdOoo
<-crowdAw1
<-matchFlash
LINE<Oh!> #continue #delay: 1000
LINE<Carraway takes a nasty bump and falls to the ground! That looks absolutely terrible!)>
<-crowdBoo1
ACTOR<LUCE> #continue
LINE<Now was that an intentional hit from Johnston there? Let’s see the replay here...>

<-clear

<-setGamescreen("sp-lowangle")

SCENE<13. EXT. FIELD.>

Full shot. Pikers players crowd around Mitch as two staff members from Medical run to them. Mitch is on the ground, dazed and not really moving. His eyes are open.

<-crowdBoo2
Some of the Pikers push Hounds players around angrily while being shepherded by umpires. Jordan would usually be a part of this crowd, but he’s not.

Medium close-up as Jordan crouches next to Mitch. Close-up on Jordan’s face. He looks worried.

ACTOR<JORDAN> #continue
LINE<Mitch! Mitch! Fuck. You alright?>

ACTOR<MITCH> #continue
LINE<(DAZED, SMILING) Jordy... I want to spend the rest of my life... with you.>

ACTOR<JORDAN> #continue
LINE<(CHUCKLES) Oh fuck, you’re concussed, mate.>

ACTOR<MITCH> #continue
LINE<I’m alright...>

<-crowdClap
Full shot. Mitch gets carried off the field on a stretcher by the medical staff as the spectators cheer and clap.

<-clear

<-setGamescreen("sp-crowd")

SCENE<14. EXT. STADIUM SEATING BAY.>

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<15:58> <QUARTER>:<3RD> #continue
<-setMatch

Sixteen minutes left in the third quarter.

ACTOR<PIKERS FAN MOTHER> #continue
LINE<I can't believe Johnston's not getting sent to the sin bin! That should be weeks suspension, for fuck’s sake!>

ACTOR<HOUNDS FAN MOTHER AND BOTH KIDS> #continue
LINE<Language!>

ACTOR<PIKERS FAN MOTHER> #continue
LINE<Sorry, sorry.>

ACTOR<PIKERS FAN CHILD> #continue
LINE<I just hope Mitch is okay...>

<-clear

<-setGamescreen("sp-lowangle")

SCENE<15. EXT. FIELD>

<-setChyron
<PIK>:<52> <HOU>:<27> <TIME>:<13:36> <QUARTER>:<3RD> #continue
<-setMatch

Montage of the Hounds kicking goals, grabbing opportunities--and the ball--from the tired-looking Pikers. 

<-setChyron
<PIK>:<53> <HOU>:<31> <TIME>:<11:56> <QUARTER>:<3RD> #continue #delay:1000
<-setGamescreen("sp-closeup2")
<-setChyron
<PIK>:<54> <HOU>:<37> <TIME>:<10:12> <QUARTER>:<3RD> #continue #delay:1000
<-setGamescreen("sp-closeup1")
<-setChyron
<PIK>:<55> <HOU>:<43> <TIME>:<07:58> <QUARTER>:<3RD> #continue
<-setGamescreen("sp-closeup3")

Jordan looks more and more frustrated, his movements go from the gracious leaps and feints from earlier to erratic, aggressive steps.

<-setGamescreen("sp-lowangle")

<-setChyron
<PIK>:<55> <HOU>:<49> <TIME>:<07:29> <QUARTER>:<3RD> #continue
<-setMatch

Eight minutes left in the third quarter.

Full panning shot. Saffy suddenly intercepts the ball and runs towards the opposite side of the field, dodging the Hounds’ tackles. 

<-setGamescreen("sp-goals")

Camera stops. She manages to break the Hounds’ defence, but Paternoster is fast approaching. 
<-ovalkick2
She quickly aims and kicks...

<-setGamescreen("sp-ball")

<-setChyron
<PIK>:<61> <HOU>:<49> <TIME>:<07:29> <QUARTER>:<3RD> #continue
<-setMatch
<-crowdCheer2
...beautifully, between the goal posts, as the crowd erupts in cheers.

<-clear

<-setGamescreen("sp-aerial")

SCENE<16. EXT. STADIUM, AERIAL SHOT>

<-setChyron
<PIK>:<68> <HOU>:<63> <TIME>:<00:30> <QUARTER>:<3RD> #continue
<-setMatch

Thirty seconds left in the third quarter.

<-gulls2
Wide aerial shot of the stadium from the perspective of the seagulls still circling around the arena.

From up here, the players on the ground are so small, you can barely tell which player belongs to which team. 

From up here, you can see the sport in its purest form: tiny dots chasing a ball under the watchful gaze of a hundred thousand cheering fans, and a flock of hungry seagulls just above.

The entire range of human emotion is here, contained in this stadium.
#stopSound: gulls2

#playSound: siren
The quarter time siren echoes into the sky.
#stopSound: siren >> fade: 2000

<-setChyron
<PIK>:<68> <HOU>:<63> <TIME>:<00:00> <QUARTER>:<QT> #continue
<-setMatch

<-setScoreworm("scoreworm-q3")

Pikers lead the Hounds, 68 to 63.

#pauseSound: hyper >> volume: 1

->fourthquarter

== fourthquarter ==

<-startTitlecard
<-whistle1
FOURTH QUARTER #continue #delay: 2000
<-endTitlecard

<-bgScreenplay
#playSound: hyper >> volume: 1
<-crowdAmbiance

<-setHeatmap("heatmap-anim")
<-setScoreworm("scoreworm-q3")
<-setPressure("pressuregauge-q4")

<-setGamescreen("sp-radiobox")

<-setMatch
SCENE<17. INT. COMMENTARY BOX.> 

<-setChyron
<PIK>:<68> <HOU>:<63> <TIME>:<22:03> <QUARTER>:<4TH> #continue
<-setMatch

Twenty-two minutes left in the fourth quarter.

ACTOR<LUCE> #continue
LINE<...and here we have Matevosyan who kicks long right into Kalmar’s open arms.>

ACTOR<RICHO> #continue
LINE<That’s going to be an easy goal for Kalmar, which puts the Pikers in immediate danger.>

ACTOR<LUCE> #continue
LINE<Indeed, it would put the Hounds in front for the first time. The game has been--perhaps surprisingly--close between these two teams despite the Pikers being the initial favourites.>

<-crowdCheer3
ACTOR<RICHO> #continue
LINE<And there goes Kalmar, he scores!> 

<-setChyron
<PIK>:<68> <HOU>:<69> <TIME>:<20:18> <QUARTER>:<4TH> #continue
<-setMatch

LINE<The Hounds have clawed their way to the front!>

<-clear

<-setGamescreen("sp-crowd")

SCENE<18. EXT. STADIUM SEATING BAY>

<-setChyron
<PIK>:<68> <HOU>:<69> <TIME>:<18:34> <QUARTER>:<4TH> #continue
<-setMatch

Eighteen minutes left in the fourth quarter. The game is neck and neck, but the Hounds keep themselves in front, always outrunning the Pikers.

<-setChyron
<PIK>:<74> <HOU>:<75> <TIME>:<16:56> <QUARTER>:<4TH> #continue
<-setMatch

Medium close-up shot. In a reversal of their introduction shot, the child with the Hounds jersey is now extremely invested in the game, while the other child wearing the Pikers jersey looks devastated.

<-setChyron
<PIK>:<76> <HOU>:<81> <TIME>:<16:13> <QUARTER>:<4TH> #continue
<-setMatch

Their mothers are transfixed by the game.

<-clear

<-setChyron
<PIK>:<83> <HOU>:<88> <TIME>:<15:48> <QUARTER>:<4TH> #continue
<-setMatch

<-setGamescreen("sp-lowangle")

SCENE<19. EXT. FIELD.>

Fifteen minutes left in the fourth quarter.

<-setGamescreen("sp-tackle1")
<-crowdBoo1
<-matchFlash
Medium close-up of Jordan as he tackles CHRIS JOHNSTON to the ground in a particularly brutal way. He gets up from the ground still grabbing Johnston by the jersey, then throws him to the ground again.

ACTOR<JOHNSTON> #continue
LINE<Leung you fucking dog!>

ACTOR<JORDAN> #continue
LINE<(SNEERS) Look who’s fucking talking ay!>

Body against body, eye for eye, tooth for tooth.

ACTOR<UMPIRE> #continue
LINE<Jordy! Get off him, Jordy!>

<-crowdBoo1
<-crowdEdging
The umpire waits for Jordan to get up on his feet, then raises both hands with his fingers spread apart, signifying ‘ten minutes’ in the sin bin.

ACTOR<JORDAN> #continue
LINE<Sir, this is unfair! He didn’t get anything for his dog act on Mitch!>

ACTOR<UMPIRE> #continue
LINE<You were paid a free kick, if there’s anything more he’ll go to the Tribunal. Please get off the field, Leung.>

Jordan steps off the field and into the tunnel to the changing rooms.

<-clear

<-setGamescreen("sp-lowangle")

SCENE<20. EXT. FIELD.>

<-setChyron
<PIK>:<86> <HOU>:<92> <TIME>:<08:15> <QUARTER>:<4TH> #continue
<-setMatch

Eight minutes left in the fourth quarter.

<-setGamescreen("sp-goals")
<-crowdBoo2
Wide shot. Bazza stands in front of the goals with the ball in his hands. He was awarded a free kick and has thirty seconds to kick the ball.

Close-up on his face. He looks nervous.

ACTOR<MITCH (V/O)> #continue

LINE<Bazza’s position is largely defensive, and it’s rare that he finds himself as the guy who has to kick goals.>
LINE<Even rarer is being the guy who has to kick the goal that would put your team back in front in a very, very important game.>
LINE<The Juice makes you more confident under pressure and generally more accurate, and kicking from where he stands should really be a piece of piss, even for someone of Bazza’s calibre.>

<-ovalkick3
Slow-motion full shot of him kicking the ball. His head raises as it follows the ball’s trajectory off-screen.

ACTOR<MITCH (V/O)> #continue
LINE<But here’s the thing. Bazza’s not taking the Juice properly.>

<-crowdEdging
The camera shows the ball whiff by the goal posts, instead going between the point posts.

<-setChyron
<PIK>:<87> <HOU>:<92> <TIME>:<05:32> <QUARTER>:<4TH> #continue
<-setMatch

That’s just one point instead of the usual six.

The Pikers are still behind.

<-clear

<-setGamescreen("sp-radiobox")
SCENE<21. INT. COMMENTARY BOX.>

<-setChyron
<PIK>:<87> <HOU>:<92> <TIME>:<05:13> <QUARTER>:<4TH> #continue
<-setMatch

Five minutes left in the fourth quarter.

<-crowdBoo1
ACTOR<RICHO> #continue
LINE<Jordan Leung’s back in the game! There’s only three minutes left, but the Pikers will need anything to score a final goal and get back in the lead!>

ACTOR<LUCE> #continue
LINE<Steele to Fields. Fields to Fletcher...>
<-ovalkick4
LINE<...who punts the ball forward! The crowd is roaring in anticipation! It’s gonna land where Paternost--\>
<-crowdWoah
LINE<(SHOUTS) Oh! Here comes Leung LEAPING onto Paternoster’s shoulders!>

ACTOR<RICHO> #continue
<-crowdCheer2
LINE<(SHOUTS) A screamer! Leung courageously takes the mark! That’s a speccy for the ages, Luce! Listen to that crowd!>

ACTOR<LUCE> #continue
LINE<And he lines up his shot...> #delay: 1000

<-crowdCheer3
<-setChyron
<PIK>:<93> <HOU>:<92> <TIME>:<02:53> <QUARTER>:<4TH> #continue
<-setMatch

LINE<...and that’s a goal for the Pikers! They’re back in the lead with just ONE point, with two minutes left in the game!>

<-clear

<-setGamescreen("sp-lowangle")
SCENE<22. EXT. FIELD.>

<-setChyron
<PIK>:<93> <HOU>:<92> <TIME>:<02:00> <QUARTER>:<4TH> #continue
<-setMatch

<-ovalkick1
The ball bounces for the reset. 

There are two minutes left in the fourth quarter.

Hounds player Willard grabs the ball and passes it to Paternoster, who launches it in a desperate move to De Santiago. 

<-setChyron
<PIK>:<93> <HOU>:<92> <TIME>:<01:00> <QUARTER>:<4TH> #continue
<-setMatch

There is one minute left in the fourth quarter.

De Santiago manages to get a hold of it, and runs like a man possessed. He kicks an impossibly long shot...

<-setChyron
<PIK>:<93> <HOU>:<92> <TIME>:<00:05> <QUARTER>:<4TH> #continue
<-setMatch

<-setScoreworm("scoreworm-q4")

There are five seconds left in the fourth quarter.

<-setChyron
<PIK>:<93> <HOU>:<93> <TIME>:<00:00> <QUARTER>:<QT> #continue
<-setMatch

<-setGamescreen("sp-goals")
<-crowdAw2
...the footy goes through the point posts, tying the game at 93-all.

<-setGamescreen("sp-aerial")
<-crowdCheer2
<-gulls2
Seagulls circle above.
Everyone knows what a tied game in the finals means.
The game is going into...

#stopAllSounds

->suddendeath

== suddendeath ==

<-startTitlecardSD
#playSound: allesthesia >> loop: true
<-crowdAmbiance
SUDDEN DEATH #continue #delay: 2000
<-endTitlecard
<-bgSuddenDeath
<-setChyronSD
<PIK>:<93> <HOU>:<93> <TIME>:<OT> <QUARTER>:<SUDDEN DEATH> #continue

<-setHeatmapSD("heatmap-sd")
<-setScorewormSD("scoreworm-sd")
<-setPressureSD("pressuregauge-sd")

<-setGamescreenSD("sp-radiobox")

<-setMatchSD
SCENE<23. INT. COMMENTATOR BOX.>

ACTOR<LUCE> #continue
LINE<...now, Sudden Death is extremely rare in this game, especially in a finals game! I can’t imagine how the fans out there are feeling, especially for the Pikers.>

ACTOR<RICHO> #continue
LINE<It does feel like we’re witnessing one of the most exciting games of the Unlimited era.>

ACTOR<LUCE> #continue
LINE<For people unfamiliar--Sudden Death means the first team to score wins the game. The coin flip before the round starts is extremely important, much more than in a regulation game.>

ACTOR<RICHO> #continue
LINE<It does give the starting team--the one that starts with the ball already in possession--a significant advantage. They say the starting team wins 95% of the time.>

ACTOR<LUCE> #continue
LINE<You’d have to be a special kind of unlucky to win the coin toss then go on and lose the game.>

<-clear

<-setGamescreenSD("sp-centresquare")

SCENE<24. EXT. FIELD, CENTRE SQUARE.>

Close-up of a coin in the umpire’s hand.
Hard cut. Close-up of Mitch. He’s got gauze wrapped around his head like a bandana.

ACTOR<MITCH> #continue
LINE<Heads.>

<-coinUp
Hard cut. The coin gets tossed.
<-coinDown
Hard cut. The coin lands. Heads.
Hard cut. The ball gets handed to Mitch.

<-clear

<-setGamescreenSD("sp-lowangle")

SCENE<24. EXT. FIELD>

Wide shot. The teams get in position. Every single player on the field is exhausted.
Mitch is back on-side. He shouldn’t be, but he is, because that’s what this sport is.
<-whistle1
Close up. The umpire blows the whistle.
Aerial shot. The entire stadium breaks into action.

ACTOR<SHIV (V/O)> #continue
LINE<Coin tosses are easy to understand. There are two sides, which you instinctively understand means two results.>

The following play is as flawless as it goes. The camera pans as Mitch handballs to Fletcher, who passes to Saffy, who passes to Jordan, who passes to Trenton in quick succession, each pass getting them closer to the Hounds’ goals.

ACTOR<SHIV (V/O)> #continue
LINE<But consider the football. Its oblong shape.>

<-ovalkick3
The camera pans further as Trenton kicks forward. It’s a beautiful kick. It’s heading straight to Lucky, who’s right in front of the goals.

ACTOR<SHIV (V/O)> #continue
LINE<This football has the aerodynamics of a torpedo when kicked. It's really unusual, this thing. It’s a marvel of technology, but it’s also ancient, a known entity. And yet, when it hits the ground, well, that’s when you start praying to Lady Luck.>

<-setGamescreenSD("sp-closeup2")
<-crowdEdging
Medium-shot, slow-motion. Lucky extends his arms and jumps...

ACTOR<SHIV (V/O)> #continue
LINE<It’s that oval shape, the icon of the sport, that is also at times a source of our chagrin. You see, its bounce, when it hits the ground after being kicked, is completely unpredictable.>

<-setGamescreenSD("sp-closeup1")
<-matchFlash
<-crowdAw2
...but the ball slips through Lucky’s fingers. He watches helplessly as it bounces away from any of his teammates...


ACTOR<SHIV (V/O)> #continue
LINE<You can plan for every contingency, work out as hard as you can, be a natural-born football genius, hell, you can even juice yourself up, but a bad bounce will destroy everything you’ve built up in a split second. And that happens roughly half the time a bounce happens.>

<-setGamescreenSD("sp-closeup4")
<-crowdGasp
...and right into Paternoster’s arms.

ACTOR<SHIV (V/O)> #continue
LINE<(LAUGHS) You may as well flip a coin.>

It all happens too quickly, all at once. 

<-crowdComeOn
Paternoster turns around and books it to the opposite side. Nothing can stop him. *Nothing can stop him.* Not Mitch attempting to tackle him, not Jordan trying to block him, not anything, ever.

<-setGamescreenSD("sp-goals")
Like a cannonball, he makes his way in front of the Pikers’ goals... 

<-setGamescreenSD("ball")
<-ovalkick3
...and scores. #delay: 500 #continue 

<-setGamescreenSD("sp-triumph")
<-setChyronSD
<PIK>:<93> <HOU>:<99> <TIME>:<OT> <QUARTER>:<SUDDEN DEATH> #continue
<-crowdYes
<-crowdCheer2
<-crowdCheer3
<-setMatch
The crowd explodes into pandemonium.

<-whistle2
The umpire blows his whistle as the Hounds players all converge into a pile of joy, muscle and sweat.

The Hounds fan mother and her Hounds fan child jump, overjoyed. Her wife and other child stay sitting in their seats, dejected. 

The Pikers, exhausted, are sitting or lying in the grass, talking among each other.

<-setGamescreenSD("sp-aerial")
The seagulls rejoice, thinking about the food that they’ll collect after everyone has left.

#removeAllImages: canvas
#removeContainer: gameportrait
#removeContainer: gamescreen
#removeContainer: heatmap
#removeContainer: scoreworm
#removeContainer: pressure
#removeContainer: match
#removeContainer: chyron

#stopAllSounds

<-startTitlecardFT
<-whistle3
FULL TIME#continue #delay: 2000
<-clear
#delay: 1000
PIKERS 93 - Hounds 99 #continue #delay: 2000
<-endTitlecard

->fadetoBlack ->endDemo

== endDemo ==
<-clear
#playSound: hows-it-goin >> loop:true, volume: 1
#delay: 500 >> skippable: true 
#setContainer: quotecard
Thanks for playing! #continue
If you want to play the full game and find out if love can blossom even on a football field, you can check it out on <span style="color:\#b30c4d;">dominoclub.itch.io/sudden-death</span> OR simply scan this QR code: #continue
#addImage: qrcode.png #continue
+[Back to Menu]
->menu


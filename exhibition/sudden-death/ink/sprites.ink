== toInkwindow 
#setContainer: inkwindow
<-DONE

== TopRight(filename)
<-kick1
#setContainer: portraitTopRight
#removeAllImages
#animClass: animFlash >> target:portraitTopRight, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitTopRight
->DONE

== TopRightFlip(filename)
<-kick2
#setContainer: portraitTopRight
#removeAllImages
#animClass: animFlash >> target:portraitTopRight, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitTopRight, classes: flipped
->DONE

== BottomLeft(filename)
<-kick3
#setContainer: portraitBottomLeft 
#removeAllImages
#animClass: animFlash >> target:portraitBottomLeft, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitBottomLeft
->DONE

== BottomLeftFlip(filename)
<-kick4
#setContainer: portraitBottomLeft
#removeAllImages
#animClass: animFlash >> target:portraitBottomLeft, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitBottomLeft, classes: flipped
->DONE

== TopRightEffect(filename)
#addImage: {filename} >> target: portraitTopRight, classes: transparent
->DONE

== TopRightEffectFlip(filename)
#addImage: {filename} >> target: portraitTopRight, classes: transparent flipped
->DONE

== BottomLeftEffect(filename)
#addImage: {filename} >> target: portraitBottomLeft, classes: transparent
->DONE

== BottomLeftEffectFlip(filename)
#addImage: {filename} >> target: portraitBottomLeft, classes: transparent flipped
->DONE

== TopRightSex(filename)
<-kick5
#setContainer: portraitTopRight >> classes: sex
#removeAllImages
#animClass: sexFlash >> target:portraitTopRight, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitTopRight
->DONE

== BottomLeftSex(filename)
<-kick6
#setContainer: portraitBottomLeft >> classes:  sex
#removeAllImages
#animClass: sexFlash >> target:portraitBottomLeft, skippable:false, wait:false, remove:true
#addImage: {filename} >> target: portraitBottomLeft
->DONE

== removeBottomLeft
#removeAllImages: portraitBottomLeft
#removeContainer: portraitBottomLeft
<-toInkwindow
->DONE

== removeTopRight
#removeAllImages: portraitTopRight
#removeContainer: portraitTopRight
<-toInkwindow
->DONE

== removePortraits
#removeAllImages: portraitTopRight
#removeAllImages: portraitBottomLeft
#removeContainer: portraitTopRight
#removeContainer: portraitBottomLeft
<-toInkwindow
->DONE

let's preload this shit

#addImage: bazza
#addImage: bazza-angry
#addImage: bazza-neutral
#addImage: bazza-sad
#addImage: bazza-smile
#addImage: bazza-sweat

#addImage: jordan
#addImage: jordan-angry
#addImage: jordan-laugh
#addImage: jordan-lustful
#addImage: jordan-naked
#addImage: jordan-neutral
#addImage: jordan-evil
#addImage: jordan-sad
#addImage: jordan-sigh
#addImage: jordan-smile

#addImage: lucky
#addImage: lucky-angry
#addImage: lucky-neutral
#addImage: lucky-sad
#addImage: lucky-smile
#addImage: lucky-sweat
#addImage: lucky-unhappy

#addImage: jordan-blush
#addImage: jordan-sweat

#addImage: mitch
#addImage: mitch-angry
#addImage: mitch-embarrassed
#addImage: mitch-flustered
#addImage: mitch-laugh
#addImage: mitch-neutral
#addImage: mitch-ow
#addImage: mitch-sad
#addImage: mitch-sigh
#addImage: mitch-sadsmile
#addImage: mitch-smile
#addImage: mitch-smug
#addImage: mitch-unimpressed

#addImage: mitch-blush
#addImage: mitch-sweat

#addImage: mitch-old
#addImage: mitch-old-angry
#addImage: mitch-old-embarrassed
#addImage: mitch-old-laugh
#addImage: mitch-old-neutral
#addImage: mitch-old-sad
#addImage: mitch-old-smile
#addImage: mitch-old-sadsmile

#addImage: saffy
#addImage: saffy-angry
#addImage: saffy-laugh
#addImage: saffy-sad
#addImage: saffy-smile
#addImage: saffy-sweat
#addImage: saffy-unimpressed

#addImage: saffy-old
#addImage: saffy-old-angry
#addImage: saffy-old-laugh
#addImage: saffy-old-sad
#addImage: saffy-old-smile
#addImage: saffy-old-unimpressed

#addImage: shiv
#addImage: shiv-alt
#addImage: shiv-peaceful
#addImage: shiv-smile
#addImage: shiv-thinking
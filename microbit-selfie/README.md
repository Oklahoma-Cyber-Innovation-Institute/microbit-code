# Micro:Bit Selfie

Generates Micro:Bit python code to display a JPEG on the Micro:Bit's 5 x 5 LED
Display

## Usage

`python3 microbit-selfie.py your-image-here.jpg`

## Result

```
$ python3 microbit-selfie.py image.jpg

# Paste this into https://python.microbit.org/ and upload to your Micro:Bit!
from microbit import *

# /path/to/your/image.jpg
microimg = Image(
             '76457:'
             '73325:'
             '62523:'
             '74434:'
             '75444:')

display.show(microimg)
```

"""
Usage: python3 microbit-selfie.py [input.jpg]
"""


from PIL import Image
import os, sys

#with Image.open("selfie.jpg") as im:
#    im.show()

code_template = """\
# Paste this into https://python.microbit.org/ and upload to your Micro:Bit!
from microbit import *

# %filename%
microimg = Image(
             '%0%:'
             '%1%:'
             '%2%:'
             '%3%:'
             '%4%:')

display.show(microimg)
"""

size = 5,5

infile = sys.argv[1]
outfile = os.path.splitext(infile)[0] + "-mini.jpg"
if infile != outfile:
    try:
        im = Image.open(infile)
        im = im.resize(size, Image.Resampling.LANCZOS)
        im.thumbnail(size, Image.Resampling.LANCZOS)
        im.save(outfile, "JPEG")

        pixels = im.load()
        w, h = im.size
        for y in range(h):
            line = ""
            for x in range(w):
                cur_pixel = pixels[x, y]

                # Current pixel in 0-225 Monochromatic scale
                cur_pixel_mono = round( sum(cur_pixel) / len(cur_pixel) )

                # Current pixel in 0-9 Microbit Brightness scale
                cur_pixel_microbit = ( cur_pixel_mono * 9 ) // 255

                line += str(cur_pixel_microbit)
                #print(cur_pixel_microbit,end=" ")
                #print(f"x{x}y{y}", end=", ")
            code_template = code_template.replace(f"%{y}%",f"{line}")
            #print(line)
            #print()

        code_template = code_template.replace(f"%filename%",f"{infile}")

        print(code_template)

    except IOError:
        print("Cannot create mini image for %s" % infile)

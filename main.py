import qrcode

img = qrcode.make(
    ">質問１\n>q2\n"
)

img.save('./test.png')
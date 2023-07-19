import qrcode

img = qrcode.make(
    ">学年と学部、学科を教えてください。\n>趣味はなんですか？\n>好きな食べ物はなんですか？\n>年齢を教えてください。\n>自由に書きたいことがあれば記入してください。\n"
)

img.save('./test.png')
import cv2

img = cv2.imread('/Users/h.tatsuhiro/PycharmProjects/jsei2023_EleQ-Server/test.png')

print(img.size)

qrcd = cv2.QRCodeDetector()

retval = qrcd.detectAndDecodeMulti(img)

print(retval)
from PIL import Image, ImageFilter


im = Image.open('img/AdlamGlyphUpdateProposal_L2019_19070-adlam-font.png')

size =  im.size
wpix = (255, 255, 255)

# Returns non-empty ranges for columns in the given image
def findColumns(img):
  columns = []
  for x in xrange(size[0]):
    for y in xrange(size[1]):
      a = 0
    # find leftmost

# returns first col in the col that != white
def scanRow(img, row):
  leftDot = -1
  col = 0
  max = img.size[0]
  while col < max:
    if img.getpixel((col,row)) != wpix:
      return row
    col += 1
  return -1

def findRows(img):
  print 'Rows: %s' % img.size[1]
  pairs = []
  first = -1
  second = -1

  inside = False
  for row in xrange(img.size[1]):
    start = scanRow(img, row)
    if start > -1:
      if not inside:
        first = row
        inside = True
      else:
        second = row
    else:
      if inside:
        pairs.append([first,second])
      inside = False
  return pairs

# returns first col in the col that != white
def scanCol(img, col):
  leftDot = -1
  row = 0
  max = img.size[1]
  while row < max:
    if img.getpixel((col,row)) != wpix:
      return col
    row += 1
  return -1


def findColumns(img):
  print 'Columns: %s' % img.size[0]
  pairs = []
  first = -1
  second = -1

  inside = False
  for col in xrange(img.size[0]):
    start = scanCol(img, col)
    if start > -1:
      if not inside:
        first = col
        inside = True
      else:
        second = col
    else:
      if inside:
        pairs.append([first,second])
      inside = False

  return pairs


print im.size
colsRaw = findColumns(im)
#print '%d Columns: %s' % (len(colsRaw), colsRaw)
rowsRaw = findRows(im)
#print '%d Rows: %s' % (len(rowsRaw), rowsRaw)

rowId = 1
colId = 2

# Get max row height and column width
maxRowHeight = 0
for rowId in xrange(1, len(rowsRaw)):
  h = rowsRaw[rowId][1] - rowsRaw[rowId][0] + 1
  if h > maxRowHeight:
    maxRowHeight = h

maxColWidth = 0
for colId in xrange(2, len(colsRaw)):
  w = colsRaw[colId][1] - colsRaw[colId][0] + 1
  if w > maxColWidth:
    maxColWidth = w

print '%rows, % columns' % (len(rowsRaw), len(colsRaw))
print 'Max width = %d, max height = %d' % (maxColWidth, maxRowHeight)

ucode = 0x1e900
firstRow = 1
namebase = 'StdFont'
firstRow = 2
namebase = 'EbrimaFont'

for rowId in xrange(firstRow, len(rowsRaw), 2):
  rowStart = ((rowsRaw[rowId][1] + rowsRaw[rowId][0]) - (maxRowHeight + 4)) / 2
  rowEnd = rowStart + maxRowHeight + 4

  print '0x%x %s  %s' % (ucode, rowsRaw[rowId], colsRaw[colId])
  for colId in xrange(2, len(colsRaw)):
    colStart = ((colsRaw[colId][1] + colsRaw[colId][0]) - (maxColWidth + 4)) / 2
    colEnd = colStart + maxColWidth + 4

    clipped = im.crop((colStart, rowStart, colEnd, rowEnd))

    name = 'img/%s_U%x.png' % (namebase, ucode)
    print '  Saved %s' % name
    clipped.save(name)
    ucode += 1




    exim = im.crop((200, 0, 253, 1193))

saved = exim.save('cropped.png')
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Starting with
#   https://codereview.stackexchange.com/questions/98247/wordsearch-generator
import itertools
import logging
import sys
from random import randint

# Set up fill letters, including those with diacritics.
# Should we done something with statistics?
# Check for bad words?

upper_letters = u'𞤀𞤁𞤂𞤃𞤄𞤅𞤆𞤇𞤈𞤉𞤊𞤋𞤌𞤍𞤎𞤏𞤐𞤑𞤒𞤓𞤔𞤕𞤖𞤗𞤘𞤙𞤚𞤛𞤜𞤝𞤞𞤟𞤠𞤡'
lower_letters = u'𞤢𞤣𞤤𞤥𞤦𞤧𞤨𞤩𞤪𞤫𞤬𞤭𞤮𞤯𞤰𞤱𞤲𞤳𞤴𞤵𞤶𞤷𞤸𞤹𞤺𞤻𞤼𞤽𞤾𞤿𞥀𞥁𞥂𞥃'
letters = lower_letters

debug = True

# Constants for word from the starting point
RIGHT, DOWN, DOWNRIGHT, UPRIGHT = 0, 1, 2, 3
RIGHT_OFFSET, DOWN_OFFSET, DOWNRIGHT_OFFSET, UPRIGHT_OFFSET = (
    [0, 1], [1, 0], [1, 1], [1, -1]
)

#### THE NEW IMPLEMENTATION.
class Position():
    def __init__(self):
        self.tokens = []
        self.x = 0
        self.y = 0
        self.positions = []  # The grid locations for all
        self.direction  # right, down, down right, up right
        self.reversed  # Are the tokens in inverse order?
        self.clue  # For crossword, show this

        self.directions = [RIGHT, DOWN, DOWNRIGHT, UPRIGHT]

    def genPositions(self):
        # Creates the positions from the start, size, direction, reverse
        return


class WordSearch():
    def __init__(self):
        self.grid = None
        self.do_diagonal = True
        self.do_reverse = True
        self.size = 0
        self.width = 0
        self.height = 0
        self.wordlist = None
        self.answers = None
        self.current_level = 0
        self.level_answer = []  # Levels with tentative inserts
        self.fill_tokens = []  # The tokens for the language
        self.solution_list = []  # For storing multiple results
        self.optimize_flag = False  # Set if the "best" one is desired
        self.total_tests = 0  # How many testWordInsert calls made

    def generateOptions(self, tokens):
        # Given the grid and the token, find all the places
        # where it could be placed, given grid size and
        # number of tokens in the word
        positions = []
        length = len(tokens)
        for x in xrange(0, self.width - length):
            for y in xrange(0, self.height - length):
                for dir in self.directions:
                    positions.append([x, y])
        return positions

    def tryWordInsert(self, tokens):
        # Put the word at the next level
        self.level += 1

    def testWordInsert(self, tokens, position):
        return False

    def revertWordAtLevel(self):
        return True

    def evaluateGrid(self):
        # Returns something about the compactness and overlap
        return

    def finishGrid(self):
        # Fills in the blank spaces as needed
        return

    def deliverHints(self):
        # Either the words in the list or the clues
        return

#### THE OLD IMPLEMENTATION.

def makeGrid(words, size=[10,10], attempts=10, is_wordsearch = True):
    '''Run attemptGrid trying attempts number of times.

    Size contains the height and width of the board.
    Word is a list of words it should contain.'''
    logging.info('makeGrid: size = %s, is_wordsearch = %s' %
                 (size, is_wordsearch))

    tokenList = [getTokens(x) for x in words].sort(key=len, reverse=True)
    for attempt in range(attempts):
        if debug:
            logging.info('makeGrid: try = %s' % (attempt))
        try:
            return attemptGrid(words, size, is_wordsearch)
        except RuntimeError as e:
            logging.error('AttemptGrid error %s' % e)
            pass
    logging.info("ERROR - Couldn't create valid board")
    return None, None

def attemptGrid(words, size, is_wordsearch=True):
    '''Attempt a grid of letters to be a wordsearch

    Size contains the height and width of the board.
    Word is a list of words it should contain.
    Returns the 2D list grid and a dictionary of the words as keys and
    lists of their co-ordinates as values.'''

    # logging.info('tokenList = %s', tokenList)

    #Make sure that the board is bigger than even the biggest set of tokens
    tokenList = []
    for w in words:
      tokenList.append(getTokens(w))
    logging.info('tokenList = %s', tokenList)

    sizeCap = (size[0] if size[0] >= size[1] else size[1])
    sizeCap -= 1
    if any(len(tokens) > sizeCap for tokens in tokenList):
      logging.info("ERROR: Too small a grid for supplied words: %s" % words)
      return None, None

    grid = [[' ' for _ in range(size[0])] for __ in range(size[1])]


    #Insert answers and store their locations
    answers = {}
    for word in words:

        grid, answer, reversed = insertWord(word, grid, None, is_wordsearch)
        if answer[0][0] == answer[-1][0]:
            #logging.info('A ROW')
            direction = 'ROW'
        elif answer[0][1] == answer[-1][1]:
            direction = 'COLUMN'
        else:
            direction = 'DIAGONAL'

        if reversed:
            # Put the coordinates in the right order
            answer.reverse()

        answers[word] = [answer, reversed, word, direction]

    #Add other characters to fill the empty space, if needed.
    if is_wordsearch:
        fillEmptyGridSlots(letters, grid, size)

    return grid, answers


def fillEmptyGridSlots(letters, grid, size):
    # Add other characters to fill the empty space
    fillTokens = getTokens(letters)
    numTokens = len(fillTokens)
    for i, j in itertools.product(range(size[1]), range(size[0])):
        if grid[i][j] == ' ':
            grid[i][j] = fillTokens[randint(0, numTokens - 1)]


def insertWord(word, grid, invalid, is_wordsearch):
    '''Insert a word into the letter grid

    'word' will be inserted into the 2D list grid.
    invalid is either None or a list of coordinates
    These coordinates are denote starting points that don't work.
    Returns an updated grid as well as a list of the added word's indices.'''

    if debug:
      logging.info('insert word %s' % word)
    height, width = len(grid), len(grid[0])
    # TODO: Use the number of combined characters, not just length.
    tokens = getTokens(word)
    length = len(tokens)

    if is_wordsearch:
      max_dir = 3
    else:
      max_dir = 1  # For crossword

    #Detect whether the word can fit horizontally or vertically.
    hori = width >= length + 1
    vert = height >= length + 1
    diag = False
    if hori and vert:
        #If both can be true, flip a coin to decide which it will be
        rint = randint(0, max_dir)
        hori = vert = diag = False
        if rint == 0:
            hori = True
            direction = 'x'
        elif rint == 1:
            vert = True
            direction = 'y'
        elif rint == 2:
            diag = True
            direction = 'dd'
            #print 'TRY DIAGONAL Down'
        else:
            diag = True
            direction = 'du'
            #print 'TRY DIAGONAL up'

    line = [] #For storing the letters' locations
    if invalid is None:
        invalid = [[None,None,True],[None,None,False]]

    # new: Generate all the positions at which this word can start.
    positions = []
    for x in xrange(0, width-length):
        for y in xrange(0, height-length):
            positions.append([x,y])

    # Now generate a starting coordinate from the above.
    num_positions = len(positions)
    if num_positions < 1:
        print 'only one position'
    rand_pos = randint(0, num_positions - 1)
    x = positions[rand_pos][0]
    y = positions[rand_pos][1]

    #Height * width is an approximation of how many attempts we need
    # Get a random position that fits
    for _ in range(height*width):
        if direction == 'x':
            x = randint(0,width-1-length)
            y = randint(0,height-1)
        elif direction == 'y':
            x = randint(0,width-1)
            y = randint(0,height-1-length)
        elif direction == 'dd':
            x = randint(0, width - 1 - length)
            y = randint(0, height - 1 - length)
        else:
            # Diagonal up
            x = randint(0, width-1-length)
            y = randint(length -1, height - 1)

        if [y,x,direction] not in invalid:
            break
    else:
        # Probably painted into a corner, raise an error to retry.
        raise(RuntimeError)

    start = [y, x, direction] #Saved in case of invalid placement
    # logging.info('Start = %s' % start)
    if is_wordsearch:
      do_reverse = bool(randint(0,1))
    else:
      do_reverse = False  # Not for crossword

    #Now attempt to insert each letter
    if do_reverse:
        tokens.reverse()
    line = tryPlacingWord(tokens, x, y, direction, grid)

    if line:
        if do_reverse:
            line.reverse()
            # print 'REVERSED'
        for i,cell in enumerate(line):
            grid[cell[0]][cell[1]] = tokens[i]
        return grid, line, do_reverse
    else:
        # If it didn't work, we could try the reversed word.
        # But for now, just quit.

        invalid.append(start)
        return insertWord(word, grid, invalid, is_wordsearch)



# Returns True if the word fits at the given spot with given direction.
# Returns False if it doesn't fit.
def tryPlacingWord(tokens, x, y, direction, grid):
    line = [] #For storing the letters' locations

    for letter in tokens:
        try:
            if grid[y][x] in (' ', letter):  # Check if it's the letter or a blank.
                line.append([y, x])
                if direction == 'x':
                    x += 1
                elif direction == 'y':
                    y += 1
                elif direction == 'dd':
                    # And handle diagonal down, too!
                    x += 1
                    y += 1
                else:
                    # And handle diagonal up!
                    x += 1
                    y -= 1
            else:
                return False
        except IndexError:
            print 'IndexError x,y: [%s, %s]' % (x, y)

    return line


def getTokens(word):
    '''Get the tokens, not code points.'''
    # This is language-specific.
    # TODO: make this smarter utf-16 and diacritics.
    vals = list(word)
    retval = []
    index = 0
    while index < len(vals):
        item = ''
        v = ord(vals[index])

        if v >= 0xd800 and v <= 0xdbff:
            item += vals[index] + vals[index+1]
            index += 2
        else:
            item += vals[index]
            index += 1
        while index < len(vals) and ord(vals[index]) >= 0x300 and ord(vals[index]) <= 0x365:
            # It's a combining character. Add to the growing item.
            item += vals[index]
            index += 1

        if sys.maxunicode <= 0xffff:
            # Python compiled with
            while index + 1 < len(vals) and (ord(vals[index]) == 0xD83A and
                ord(vals[index+1]) >= 0xdd44 and ord(vals[index + 1]) <= 0xdd4a):
                # It's an Adlam combining character. Add to the growing item.
                item += vals[index] + vals[index+1]
                index += 2
        else:
            while index < len(vals) and (
                ord(vals[index]) >= 0x1E944 and ord(vals[index]) <= 0x1E94A):
                # It's an Adlam combining character. Add to the growing item.
                logging.info('Character in big range = %s' % ord(vals[index]))
                item += vals[index]
                index += 1
            pass

        retval.append(item)
    return retval


def printGrid(grid):
    '''Print the grid in a friendly format.'''

    width = len(grid[0])
    print ("+" + ('---+' * width))

    for i,line in enumerate(grid):

        print (u"| " + u" | ".join(line) + u" |")
        print ("+" + ('---+' * width))


def printAnswers(answers):
    for answer in answers:
        #print(' %s: %s' % answer, answers[answer])
        print answer, answers[answer]


# Runs with an array of words
def generateWordsGrid(words):
    # Set the size to be the maximum word length.
    max_xy = 0
    total_tokens = 0

    for word in words:
        # logging.info(word)
        tokens = getTokens(word)
        total_tokens += len(tokens)
        if len(tokens) > max_xy:
            max_xy = len(tokens)
    #logging.info('max size = %s ' % (max_xy))
    grid, answers = makeGrid(words, [max_xy + 1, max_xy + 1], 10, True)
    return grid, answers, words, max_xy + 1


def generateCrosswordsGrid(words):
    # Make a grid with no reversals, no diagonals

    # Don't fill in the empty spaces
    max_xy = 0
    total_tokens = 0

    for word in words:
        # logging.info(word)
        tokens = getTokens(word)
        total_tokens += len(tokens)
        if len(tokens) > max_xy:
            max_xy = len(tokens)
    logging.info('generateCrosswordsGrid max size = %s ' % (max_xy))
    grid, answers = makeGrid(words, [max_xy + 1, max_xy + 1], 10, False)
    return grid, answers, words, max_xy + 1


# Runs with a set grid
def testGrid():
    words = [u'𞤼𞤢𞤦𞤢𞤤𞤣𞤫', u'𞤵𞤧𞤭𞤯𞤮', '𞤢𞤤𞤢𞤤']

    max_xy = 0
    total_tokens = 0

    longest_word = None
    for word in words:
        tokens = getTokens(word)
        # logging.info('word, tokens = %s, %s ' % (word, len(tokens)))
        total_tokens += len(tokens)

        if len(tokens) > max_xy:
            longest_word = word
            max_xy = len(tokens)
    #logging.info('max size = %s, %s ' % (max_xy, longest_word))
    grid, answers = makeGrid(words, [max_xy + 1, max_xy + 1], 10, False)
    return grid, answers, words, max_xy + 1



def main(args):
  # The test words, with diacritics



  words = ['𞤢𞥄', '𞤣𞥆', '𞤤𞥆', '𞤥𞥆𞤢', '𞤪𞤦𞥆', '𞤫𞥅𞤸𞤧', '𞥁𞥂𞥆']
  # TODO: Try with a crossword
  grid, answers = makeGrid(words, [5, 5], 10, True)


  printGrid(grid)
  printAnswers(answers)

if __name__ == "__main__":
    print 'ARGS = %s' % sys.argv
    sys.exit(main(sys.argv))

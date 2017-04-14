import sys

import PyPDF2
from fpdf import FPDF

def testReadPDF():
  samplePDF = 'Lakotalanguageplansandideas.pdf'
  pdf_file = open(samplePDF)

  read_pdf = PyPDF2.PdfFileReader(pdf_file)


  number_of_pages = read_pdf.getNumPages()
  print '%d pages in document' % number_of_pages

  for pageNum in xrange(number_of_pages):
    page = read_pdf.getPage(pageNum)
    print 'Page %d content:' % pageNum
    page_content = page.extractText()
    print page_content
    print


def testWritePDF(outfilename):

  pdf = FPDF()
  pdf.add_page()
  pdf.set_font('Arial', 'B', 16)
  pdf.cell(40, 10, 'Hello World!')
  pdf.output(outfilename, 'F')


def main(argv):
  testWritePDF('new.pdf')


if __name__ == '__main__':
  main(sys.argv)

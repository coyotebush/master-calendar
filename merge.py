#!/usr/bin/python
import sys
import os.path
from BeautifulSoup import BeautifulSoup, Tag

types = {'.js': ('script', 'src', {}), '.css': ('link', 'href', {'rel': 'stylesheet'})}

if len(sys.argv) < 3:
	print 'usage: {0} foo.html relname [outpath]'
	exit
inname, relname = sys.argv[1:3]
outpath = sys.argv[3] if len(sys.argv) > 3 else ''

soup = BeautifulSoup(open(inname))

for (ext, (tag, att, atts)) in types.iteritems():
	filenames = [x.extract()[att] for x in soup.head(tag)
			if all(x[a] == v for (a, v) in atts.items())]

	outname = relname + ext
	outfile = open(outpath + outname, 'w')
	for filename in filenames:
		try:
			f = open(filename)
			outfile.write(f.read())
		except IOError:
			print >>sys.stderr, 'cannot process', filename

	soup.head.append(Tag(soup, tag, atts.items() + [(att, outname)]))
	
print soup


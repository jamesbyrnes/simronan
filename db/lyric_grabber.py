from lxml import html
import requests
import sqlite3

def main():
    SOURCE = 'http://lyrics.wikia.com/wiki/VNV_Nation'
    PREFIX = 'http://lyrics.wikia.com'
    ARTIST = 'VNV Nation'
    
    page = requests.get(SOURCE)
    tree = html.fromstring(page.content)

    conn = sqlite3.connect('./lyrics.db')
    c = conn.cursor()

    for x in tree.xpath('//div[@id="WikiaArticle"]//ol/li//a[1]/@href'):
        subpage = requests.get(PREFIX + x)
        subtree = html.document_fromstring(subpage.content)
        song_title = subtree.xpath('//div[@id="song-header-title"]/b/text()')[0]
        album = subtree.xpath('//div[@id="song-header-container"]//i/a/text()')[0]
        lyrics = subtree.xpath('//div[@class="lyricbox"]/text()')[:-1]
        if lyrics[0] != ' ' and song_title != "Forsaken":
            c.execute("INSERT INTO lyrics (artist, album, song_title, lyrics) VALUES (?, ?, ?, ?)", (ARTIST, album, song_title, ('\n').join(lyrics)))
            conn.commit()

    c.close()

if __name__ == "__main__":
    main()

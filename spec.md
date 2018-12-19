API Project: URL Shortener Microservice
User Story:

    I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
    Example : {"original_url":"www.google.com","short_url":1}
    If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
    HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
    When I visit the shortened URL, it will redirect me to my original link.

Short URL Creation

example: POST [project_url]/api/shorturl/new - https://www.google.com

Get url from the post request
Check if url has already been shortened by reading JSON file of links
if duplicate ->
return JSON {original url, short url}
if not a duplicate ->
dns.lookup to check if the link is to a valid site
if it's not ->return a JSON with error msg
store new link as a variable (get a new short-url based on length?)
put link into the parsed JSON
fs.writefile the new updated json
return the new link json {original, short}

redirecting to links
path /api/shorturl/:shorturl
read json, search for a file with the short url given
redirect to original url in that file if found
else 404 {no short url found }

TODO add frontend

## Automatic Haiku Generator
What's this about?  Well, on a surface level, it generates a random background and displays it with a randomly generated haiku.

But under the hood, all processing is done in JS using Node.  Would it have been easier to use C#, Python, or PHP to do this?  Arguably, yes.  Would it have been easier to use an actual web server to handle the routing?  Absolutely, but I wanted to keep it lightweight and do it in Node.

### How does it work?
There are two client-side APIs:
>/background - uses fs to scan a directory of images for the background and select one at random, which is then injected into the *body* tag with jquery.  (Oh, and let me tell you, getting them to scale to fit the screen on desktop and mobile was a blast.)
  
 >/data - pulls a json file that contains the dictionary of words, grammatical rules.  It then uses these to build the haiku and returns it as a json object, which is used by jquery to update the dom.

On the server side, I had to create code to handle each of the different types of requests: html, js, css, json, and images.  The meat and potatoes happens in the <code>(req.url == '/data')</code> block

To run it locally, type 
<code>node index.js</code>

I've included the files necessary for running it on Azure.  That part was taken from Microsoft's  https://github.com/Azure-Samples/nodejs-docs-hello-world

If you want to see it in action, you can head over to my website at https://rochkind.com/haiku/
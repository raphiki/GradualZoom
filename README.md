# GradualZoom

## What is it?

GradualZoom is a small JavaScript Library allowing to gradually zoom on images when they are clicked on.

* It is released under the <a href="http://www.gnu.org/licenses/gpl.html">GNU Public License</a>, any contribution, enhancement or adaptation is fairly welcomed.
* Try the <a href="http://semeteys.org/tek/JavaScript/GradualZoom/">demo</a> 
* Current version is 0.1, it can be downloaded <a href="http://semeteys.org/tek/JavaScript/GradualZoom/GradualZoom.js">here</a>.</li>
* ScriptDoc Reference is available <a href="http://semeteys.org/tek/JavaScript/GradualZoom/GradualZoom_docs/index.html">here</a>.</li>
* It has been succesfully tested on Mozilla Firefox, Opera, Konqueror, Safari and Internet Explorer. Please report any compatibility problems (raphael AT semeteys DOT org)</li>

## How to use it in your web page?

* Insert the <i>GradualZoom.js</i> script somewhere in your HTML document (in the &lt;head&gt; tag for instance): <pre>&lt;script type="text/javascript" src="GradualZoom.js"&gt;&lt;/script&gt;</pre>
* The image to become zoomable must fullfill following constrainsts:
    + have an unique <i>id</i></li>
    + have <i>width</i> and <i>height</i> attributes values</li>
    + be included in a <i>&lt;div&gt;</i> element with an unique id, <i>width</i>, <i>height</i> and <i>overflow: hidden</i> values precised via a <i>style</i> attribute</li>
    + be relatively positionned</li>

~~~
    <div id="myFrame" style="overflow: hidden; width: 197px; height: 141px">
      <img id="myImage" src="Fruidefendu.jpg" width="197" height="141" style="position: relative;"/>
    </div>
~~~

* Call the <i>GradualZoom.init()</i> function:
    + Either from the <i>onload</i> event of the HTML page or form another &lt;script&gt; insert (in that case it must be placed <b>after</b> the <i>GradualZoom.js</i> include)</li>
    + With the image id and frame id as parameters (passed as arrays)</li>

~~~
    <body onload = "GradualZoom.init(['myImage'], ['myFrame']);">
~~~

## How to deal with multiple images?

* Make sur that each image to be zoomable (and each containing frame) has an unique id

~~~
    <div id="__frame1__" style="overflow: hidden; width: 100px; height: 200px">
      <img id="<b>image1</b>" src="myFirstImage.jpg" width="100" height="200" style="position: relative;">
    </div>
    <div id="<b>frame2</b>" style="overflow: hidden; width: 300px; height: 175px">
      <img id="<b>image2</b>" src="mySecondImage.jpg" width="300" height="175" style="position: relative;">
    </div>
~~~

* Pass the lists of image ids and frame ids to the GradualZoom.init() function:

## Customization

If necessary, following parameters can be modified in the <i>GradualZoom</i> object:

* _GradualZoom.maxRatio_: Maximum zoom level (default value: 2)
* _GradualZoom.speed_: Number of unitary zooms between zoom levels (default value: 7)
* _GradualZoom.timeout_: Time Out, in ms, between each unitary zoom (default value: 50)


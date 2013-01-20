/**
  * GradualZoom javascript object
  *
  * @author Raphael Semeteys raphael@semeteys.org
  * @version 0.1 
  *
  * This program is free software; you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation; either version 2 of the License, or
  * (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program; if not, write to the Free Software
  * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
  *
  * Todo: 
  *  - support second image in high resolution
  */

/**
  * GardualZoom object
  */
var GradualZoom = {};

//Time Out between each unitary zoom (in ms)
GradualZoom.timeout = 50;
//Maximum zoom level
GradualZoom.maxRatio = 2;
//Number of unitary zooms between zoom levels
GradualZoom.speed = 7;
//Total number of unitary zooms
GradualZoom.nbZoom = GradualZoom.maxRatio * GradualZoom.speed;
//Set to "true" to enable debug mode
GradualZoom.debug = true;
//Array of Image <img> Ids
GradualZoom.myImageId = new Array();
//Array of Frame <div> Ids
GradualZoom.myFrameId = new Array();
//Array of Image <img> DOM elements
GradualZoom.myImage = new Array();
//Array of Frame <div> DOM elements
GradualZoom.myFrame = new Array();
//Array of images normal sizes
GradualZoom.myWidth = new Array();
GradualZoom.myHeight = new Array();
//Clicked mouse position (stored for zoom out)
GradualZoom.currentX = 0;
GradualZoom.currentY = 0;
//Clicked image number (position in myImage* arrays)
GradualZoom.currentImageNb = null;

/**
  * Actual zoom function
  * @memberOf GradualZoom
  * @param {Number} n Zoom ratio
  * @param {Number} x Left coordinate of the mouse click
  * @param {Number} y Top coordinate of the mouse click
  * @param {Number} time Time Out before image zoom
  */
GradualZoom.delayedZoom = function(n, x, y, time) {
    //Closure to use setTimeout
    setTimeout(function() {
        GradualZoom.myImage[GradualZoom.currentImageNb].width = GradualZoom.myWidth[GradualZoom.currentImageNb] * n;
        GradualZoom.myImage[GradualZoom.currentImageNb].height = GradualZoom.myHeight[GradualZoom.currentImageNb] * n;

        //Deduce (top,left) position of zoomed image from zoom ratio and mouse position
        var xn = parseInt(GradualZoom.myWidth[GradualZoom.currentImageNb] / 2) - (x * n);
        var yn = parseInt(GradualZoom.myHeight[GradualZoom.currentImageNb] / 2) - (y * n);

        //Stick zoomed image to the borders if needed
        if ((n == 1) || (xn > 0)) xn = 0;

        if ((n == 1) || (yn > 0)) yn = 0;

        if (xn < (GradualZoom.myWidth[GradualZoom.currentImageNb] * (1-n))) {
            xn = GradualZoom.myWidth[GradualZoom.currentImageNb] * (1-n);
        }

        if (yn < (GradualZoom.myHeight[GradualZoom.currentImageNb] * (1-n))) {
            yn = GradualZoom.myHeight[GradualZoom.currentImageNb] * (1-n);
        }

        GradualZoom.myImage[GradualZoom.currentImageNb].style.left = xn + "px";
        GradualZoom.myImage[GradualZoom.currentImageNb].style.top = yn + "px";
    }, time);
}

/**
  * zoomIn is triggered when normal size imaged is clicked
  * @memberOf GradualZoom
  * @param {Event} e Mouse event
  */
GradualZoom.zoomIn = function(e) {
    if (!e) e = window.event;
    
    if (e.target) target = e.target;
    else if (e.srcElement) target = e.srcElement;
    
    for(i = 0; i < GradualZoom.myImageId.length; i++) {
        if (target.id == GradualZoom.myImageId[i]) {
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            } else if (e.clientX || e.clientY) {
                x = e.clientX + document.body.scrollLeft;
                y = e.clientY + document.body.scrollTop;
            }

            GradualZoom.currentImageNb = i;
    
            //Adjust with containing frame position
            x -= GradualZoom.myFrame[i].offsetLeft;
            y -= GradualZoom.myFrame[i].offsetTop;
    
            //Gradual zoom in
            for(k = GradualZoom.speed; k <= GradualZoom.nbZoom; k++) {
                GradualZoom.delayedZoom(((k/GradualZoom.speed)*100)/100, x, y, k * GradualZoom.timeout);
            }
    
            //Mouse click will now trigger a zoom out
            GradualZoom.currentX = x;
            GradualZoom.currentY = y;
            document.onmousedown = GradualZoom.zoomOut;

            break;
        }
    }
}

/**
  * zoomOut is triggered when user clicks again
  * @memberOf GradualZoom
  * @param {Event} e Mouse event
  */
GradualZoom.zoomOut = function(e) {
    //Gradual zoom out
    for(i = GradualZoom.nbZoom; i >= GradualZoom.speed; --i) {
        GradualZoom.delayedZoom(Math.round((i/GradualZoom.speed)*100)/100, GradualZoom.currentX, GradualZoom.currentY, (GradualZoom.nbZoom - i) * GradualZoom.timeout);
    }

    //Mouse click will now trigger a zoom in
    document.onmousedown = GradualZoom.zoomIn;
}

/**
  * Initializes the GradualZoom object
  * @memberOf GradualZoom 
  * @param {Array} image ids (&lt;img id=''&gt; attribute)
  * @param {Array} frame ids (&lt;div id='' class='frame'&gt attribute)
  */
GradualZoom.init = function(images, frames) {
    GradualZoom.myImageId = images;
    GradualZoom.myFrameId = frames;

    for(i = 0; i < images.length; i++) {
        GradualZoom.myImage[i] = document.getElementById(GradualZoom.myImageId[i]);
        GradualZoom.myWidth[i] = GradualZoom.myImage[i].width;
        GradualZoom.myHeight[i] = GradualZoom.myImage[i].height;
        GradualZoom.myFrame[i] = document.getElementById(GradualZoom.myFrameId[i]);
    }

    document.onmousedown = GradualZoom.zoomIn;
}
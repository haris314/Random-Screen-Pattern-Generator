var svgNS = "http://www.w3.org/2000/svg";  
            var TOTAL = 5;
            const DIST ="200"

            document.addEventListener('DOMContentLoaded', () => {
                canvas = document.getElementById("canvas");                
            });

            /* Gets called when the user updates the total lines value */
            function updateTotal(){
                TOTAL = document.getElementById('lines').value;
                if(TOTAL == NaN){
                    TOTAL = 5;
                }
                else{
                    TOTAL++;
                }
            }

            /**
             * Generates a new pattern with min(TOTAL, maximum possible) number of lines
            */
            function generateNew() {
                console.clear();
                // Remove all the previous ones
                line = document.querySelector('.pattern');
                if(line) line.remove();
                
                X = []; // To hold the x values of the points
                Y = []; // To hold the y values of the points
                var set = new Set(); // To check which points are already covered
                var pointCount = 0; // Counts how many points were adctually inserted

                // Get the random points
                for(i=0; i<TOTAL; i++){
                    // If all the points are already covered
                    if(set.size == 9){                        
                        break;
                    }

                    // Get random values
                    x = random();
                    y = random();

                    // If these values are already covered then just continue
                    if(set.has(x*10 + y)){
                        i--;
                        continue;
                    }
                    set.add(x*10 + y); // Add to the already covered values

                    // The points which lie between this and the previous point are also to be covered
                    if(i>0){
                        x1 = Math.min(X[i-1], x);
                        x2 = Math.max(X[i-1], x);
                        y1 = Math.min(Y[i-1], y);
                        y2 = Math.max(Y[i-1], y);
                        
                        // console.log(x1, x2, y1, y2);
                        // Vertical lines
                        if(x1 === x2){
                            if((y1 === 1) && (y2 === 3)){
                                set.add(x1*10 + 2);
                            }
                        }

                        // Horizontal lines
                        if(y1 === y2){
                            if((x1 === 1) && (x2 === 3)){
                                set.add(2*10 + y1);
                            }
                        }

                        // Diagonal lines
                        if((x2-x1 === 2) && (y2-y1 === 2)){
                            set.add(2*10 + 2);
                        }
                    }
                    // console.log(`point is ${x}, ${y} and set is ${printSet(set)}`);

                    // Push the point in the array
                    X.push(x);
                    Y.push(y);
                    pointCount++; // Increment the number of points
                }

                // Draw the points
                var points = "";
                for(i=0; i<pointCount; i++){
                    points += `${X[i]*DIST},${Y[i]*DIST} `;
                }

                var polyLine = document.createElementNS(svgNS, "polyline");
                polyLine.setAttributeNS(null, "points", points);
                polyLine.setAttributeNS(null, 'class', 'pattern');
                canvas.appendChild(polyLine);             


            }

            function printSet(set){
                for(item of set.values()){
                    console.log(item);
                }
            }

            /* Gives a random number in the range [1, 3] */
            function random(){
                return Math.floor((Math.random() * 10) % 3 + 1);
            }
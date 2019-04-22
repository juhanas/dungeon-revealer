define(function () {
    console.log('brush.js starting');

    return function (context, brushTypes, settings) {
        console.log(`creating ${brushTypes[1]} brush`);

        if (!context || !settings) {
            throw new Error('Invalid args');
        }

        var currentBrushType = brushTypes[0],
            currentPattern = null,
            setBrushType = function () {
                console.error("Doesn't exist yet");
            },
            toggle = function () {
                if (currentBrushType === brushTypes[0]) {
                    console.log(`${brushTypes[0]} brush set`);
                    currentBrushType = brushTypes[1];
                } else if (currentBrushType === brushTypes[1]) {
                    console.log(`${brushTypes[1]} brush set`);
                    currentBrushType = brushTypes[0];
                } else {
                    console.log("nothing: ");
                    console.log(currentBrushType);
                }
                context.strokeStyle = getCurrent();
            },
            getPattern = function (brushType) {
                let rgb = settings[`${brushTypes[1]}RGB`];
                let opacity = settings[`${brushTypes[1]}Opacity`];
                if (brushType === brushTypes[0]) {
                    context.globalCompositeOperation = "destination-out";
                    return "rgba(" + rgb + "," + opacity + ")";
                } else if (brushType === brushTypes[1]) {
                    context.globalCompositeOperation = "source-over";
                    return "rgba(" + rgb + "," + opacity + ")";
                }
            },
            getCurrent = function () {
                return getPattern(currentBrushType);
            }

        return {
            brushTypes: brushTypes,
            currentBrushType: currentBrushType,
            setBrushType: setBrushType,
            toggle: toggle,
            getCurrent: getCurrent,
            getPattern: getPattern
        }
    };
});
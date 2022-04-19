document.querySelector('[id="second_row"]').onkeyup = changeGradientHex;
document.querySelector('[id="second_row"]').onclick = changeGradientHex;
document.querySelector('[id="fourth_row"]').onkeyup = changeGradientRGB;
document.querySelector('[id="fourth_row"]').onclick = changeGradientRGB;
document.querySelector('[id="sixth_row"]').onkeyup = changeGradientHSV;
document.querySelector('[id="sixth_row"]').onclick = changeGradientHSV;

function changeGradientHex(){
    let hex_startColor = document.querySelector('[id="hex_start"]').value;
    let hex_endColor = document.querySelector('[id="hex_end"]').value;
    let rgb_startColor = hexToRgb(hex_startColor);
    let rgb_endColor = hexToRgb(hex_endColor);
    let hsv_startColor = rgbToHSV(rgb_startColor.r, rgb_startColor.g, rgb_startColor.b);
    let hsv_endColor = rgbToHSV(rgb_endColor.r, rgb_endColor.g, rgb_endColor.b);

    document.querySelector('[id="r_start"]').value = rgb_startColor.r;
    document.querySelector('[id="g_start"]').value = rgb_startColor.g;
    document.querySelector('[id="b_start"]').value = rgb_startColor.b;
    document.querySelector('[id="r_end"]').value = rgb_endColor.r;
    document.querySelector('[id="g_end"]').value = rgb_endColor.g;
    document.querySelector('[id="b_end"]').value = rgb_endColor.b;

    document.querySelector('[id="h_start"]').value = hsv_startColor.h;
    document.querySelector('[id="s_start"]').value = hsv_startColor.s;
    document.querySelector('[id="v_start"]').value = hsv_startColor.v;
    document.querySelector('[id="h_end"]').value = hsv_endColor.h;
    document.querySelector('[id="s_end"]').value = hsv_endColor.s;
    document.querySelector('[id="v_end"]').value = hsv_endColor.v;

    document.getElementsByClassName('colorIndicator')[0].style.background = "linear-gradient(to top right,"+hex_startColor+","+hex_endColor+")";
}
function changeGradientRGB(){
    checkOutOfRangeRgb();

    let hex_startColor = rgbToHex(Number(document.querySelector('[id="r_start"]').value), Number(document.querySelector('[id="g_start"]').value), Number(document.querySelector('[id="b_start"]').value));
    let hex_endColor = rgbToHex(Number(document.querySelector('[id="r_end"]').value), Number(document.querySelector('[id="g_end"]').value), Number(document.querySelector('[id="b_end"]').value));
    let hsv_startColor = rgbToHSV(document.querySelector('[id="r_start"]').value, document.querySelector('[id="g_start"]').value, document.querySelector('[id="b_start"]').value);
    let hsv_endColor = rgbToHSV(document.querySelector('[id="r_end"]').value, document.querySelector('[id="g_end"]').value, document.querySelector('[id="b_end"]').value);

    document.querySelector('[id="hex_start"]').value = hex_startColor;
    document.querySelector('[id="hex_end"]').value = hex_endColor;

    document.querySelector('[id="h_start"]').value = hsv_startColor.h;
    document.querySelector('[id="s_start"]').value = hsv_startColor.s;
    document.querySelector('[id="v_start"]').value = hsv_startColor.v;
    document.querySelector('[id="h_end"]').value = hsv_endColor.h;
    document.querySelector('[id="s_end"]').value = hsv_endColor.s;
    document.querySelector('[id="v_end"]').value = hsv_endColor.v;

    document.getElementsByClassName('colorIndicator')[0].style.background = "linear-gradient(to top right,"+hex_startColor+","+hex_endColor+")";
}
function changeGradientHSV(){
    checkOutOfRangeHSV();

    let rgb_startColor = HSVtoRGB(Number(document.querySelector('[id="h_start"]').value), Number(document.querySelector('[id="s_start"]').value), Number(document.querySelector('[id="v_start"]').value));
    let rgb_endColor = HSVtoRGB(Number(document.querySelector('[id="h_end"]').value), Number(document.querySelector('[id="s_end"]').value), Number(document.querySelector('[id="v_end"]').value));
    let hex_startColor = rgbToHex(rgb_startColor.r, rgb_startColor.g, rgb_startColor.b);
    let hex_endColor = rgbToHex(rgb_endColor.r, rgb_endColor.g, rgb_endColor.b);
    console.log(rgb_startColor);
    document.querySelector('[id="hex_start"]').value = hex_startColor;
    document.querySelector('[id="hex_end"]').value = hex_endColor;

    document.querySelector('[id="r_start"]').value = rgb_startColor.r;
    document.querySelector('[id="g_start"]').value = rgb_startColor.g;
    document.querySelector('[id="b_start"]').value = rgb_startColor.b;
    document.querySelector('[id="r_end"]').value = rgb_endColor.r;
    document.querySelector('[id="g_end"]').value = rgb_endColor.g;
    document.querySelector('[id="b_end"]').value = rgb_endColor.b;

    document.getElementsByClassName('colorIndicator')[0].style.background = "linear-gradient(to top right,"+hex_startColor+","+hex_endColor+")";
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHSV (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
        diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: percentRoundFn(s * 100),
        v: percentRoundFn(v * 100)
    };
}
function HSVtoRGB(h, s, v) {
    h = h/360;
    s = s/100;
    v = v/100;
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function checkOutOfRangeRgb(){
    if(document.querySelector('[id="r_start"]').value > 255)
        document.querySelector('[id="r_start"]').value = 255;
    if(document.querySelector('[id="r_start"]').value < 0)
        document.querySelector('[id="r_start"]').value = 0;
    if(document.querySelector('[id="r_end"]').value > 255)
        document.querySelector('[id="r_end"]').value = 255;
    if(document.querySelector('[id="r_end"]').value < 0)
        document.querySelector('[id="r_end"]').value = 0;
    if(document.querySelector('[id="g_start"]').value > 255)
        document.querySelector('[id="g_start"]').value = 255;
    if(document.querySelector('[id="g_start"]').value < 0)
        document.querySelector('[id="g_start"]').value = 0;
    if(document.querySelector('[id="g_end"]').value > 255)
        document.querySelector('[id="g_end"]').value = 255;
    if(document.querySelector('[id="g_end"]').value < 0)
        document.querySelector('[id="g_end"]').value = 0;
    if(document.querySelector('[id="b_start"]').value > 255)
        document.querySelector('[id="b_start"]').value = 255;
    if(document.querySelector('[id="b_start"]').value < 0)
        document.querySelector('[id="b_start"]').value = 0;
    if(document.querySelector('[id="b_end"]').value > 255)
        document.querySelector('[id="b_end"]').value = 255;
    if(document.querySelector('[id="b_end"]').value < 0)
        document.querySelector('[id="b_end"]').value = 0;
}
function checkOutOfRangeHSV(){
    if(document.querySelector('[id="h_start"]').value > 360)
        document.querySelector('[id="h_start"]').value = 360;
    if(document.querySelector('[id="h_start"]').value < 0)
        document.querySelector('[id="h_start"]').value = 0;
    if(document.querySelector('[id="h_end"]').value > 360)
        document.querySelector('[id="h_end"]').value = 360;
    if(document.querySelector('[id="h_end"]').value < 0)
        document.querySelector('[id="h_end"]').value = 0;
    if(document.querySelector('[id="s_start"]').value > 100)
        document.querySelector('[id="s_start"]').value = 100;
    if(document.querySelector('[id="s_start"]').value < 0)
        document.querySelector('[id="s_start"]').value = 0;
    if(document.querySelector('[id="s_end"]').value > 100)
        document.querySelector('[id="s_end"]').value = 100;
    if(document.querySelector('[id="s_end"]').value < 0)
        document.querySelector('[id="s_end"]').value = 0;
    if(document.querySelector('[id="v_start"]').value > 100)
        document.querySelector('[id="v_start"]').value = 100;
    if(document.querySelector('[id="v_start"]').value < 0)
        document.querySelector('[id="v_start"]').value = 0;
    if(document.querySelector('[id="v_end"]').value > 100)
        document.querySelector('[id="v_end"]').value = 100;
    if(document.querySelector('[id="v_end"]').value < 0)
        document.querySelector('[id="v_end"]').value = 0;
}
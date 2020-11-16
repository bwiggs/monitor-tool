class Ratio {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.value = w/h;
    }

    toString() {
        return `${this.w}:${this.h}`;
    }
}

class Display {
    constructor(model, inches, ratio, res) {

        this.inches = inches;
        let [pxw, pxh] = res.split('x');
        this.res = res;
        this.pxh = parseInt(pxh);
        this.pxw = parseInt(pxw);
        this.ppi = Display.calcPPI(inches, pxw, pxh);
        this.ratio = ratio;
        this.visible = true;

        [this.width, this.height] = Display.calcDimensions(inches, ratio);
        this.model = model;
    }
    
    toString() {
        return `${this.name ? this.name + ' ' : ''}${this.inches}" ${this.pxw}x${this.pxh} ${this.ppi}ppi ${this.width}x${this.height}in`;
    }
 }

Display.calcPPI = (inches, w, h) => {
    return Math.round(Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / inches);
};

Display.calcDimensions = (diag_inches, ratio) => {
    let height = diag_inches / Math.sqrt(Math.pow(ratio.value, 2)+1);
    let width = height * ratio.value;
    return [Math.round(width), Math.round(height)];
};

const ASPECT_32_9 = new Ratio(32, 9);
const ASPECT_21_9 = new Ratio(21, 9);
const ASPECT_16_9 = new Ratio(16, 9);

const MONITORS = {
            DELL_4919: new Display('Dell 4919', 49, ASPECT_32_9, '5120x1440'),
            DELL_U4320Q: new Display('Dell U4320Q', 43, ASPECT_16_9, '3840x2160'),
            DELL_3818: new Display('Dell 3818', 38, ASPECT_21_9, '3840x1600'),
            DELL_3418: new Display('Dell 3418', 34, ASPECT_21_9, '3440x1440'),
            DELL_U3219Q: new Display('Dell U3219Q', 32, ASPECT_16_9, '3840x2160'),
            DELL_U2720Q: new Display('Dell U2720Q', 27, ASPECT_16_9, '3840x2160'),
            DELL_2713: new Display('Dell 2713', 27, ASPECT_16_9, '2560x1440'),
            LENOVO_X1: new Display('X1 Carbon', 14, ASPECT_16_9, '1920x1080'),
}

var app = new Vue({
    el: '#app',
    data: {
        view: {
            stacked: true,
            hcenter: true,        
            vcenter: true         
        },
        inches: null,
        ratio: null,
        res: null,
        displays: [
            MONITORS.DELL_U4320Q,
            MONITORS.LENOVO_X1,
            MONITORS.DELL_2713,
            MONITORS.DELL_U2720Q,
            MONITORS.DELL_3418,
            MONITORS.DELL_4919,
            MONITORS.DELL_U3219Q,
            MONITORS.DELL_3818,

        ],
        sizes: [
            49, 38, 34, 32, 27, 15.4, 14, 13.3
        ],
        resWidths: [
            '5120x1440',
            '3840x2160',
            '3840x1600',
            '3440x1440',
            '2560x1600',
            '2560x1440',
            '1920x1080',
        ],
        ratios: [
            '32:9',
            '21:9',
            '16:9',
        ],
        colors: [
            '#1abc9c',
            '#f1c40f',
            '##3498db',
            '#e74c3c',
            '#9b59b6',
            '#e67e22',
            '#2ecc71',
        ]
    },
    methods: {
        addMonitor: function () {
            this.displays.push(new Display(null, this.inches, this.ratio, this.res));
        },
        maxSize: () => {
            return this.displays.reduce((prev, curr)=> Math.max(prev.inches, curr.inches));
        }
    },
    computed: {
        displaysSorted: function() { 
            return this.displays.sort((a, b) => b.inches - a.inches);
        }

    }
});
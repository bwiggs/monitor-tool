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
    constructor(model, inches, ratio, res, link) {

        this.inches = inches;
        let [pxw, pxh] = res.split('x');
        this.res = res;
        this.pxh = parseInt(pxh);
        this.pxw = parseInt(pxw);
        this.ppi = Display.calcPPI(inches, pxw, pxh);
        this.ratio = ratio;
        this.visible = true;
        this.link = link;

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
            DELL_U4919DW: new Display('Dell U4919DW', 49, ASPECT_32_9, '5120x1440', 'https://www.dell.com/en-us/work/shop/dell-ultrasharp-49-curved-monitor-u4919dw/apd/210-arnw/monitors-monitor-accessories'),
            DELL_U4320Q: new Display('Dell U4320Q', 43, ASPECT_16_9, '3840x2160', 'https://www.dell.com/en-us/work/shop/accessories/apd/210-AVKE'),
            DELL_U3818DW: new Display('Dell U3818DW', 38, ASPECT_21_9, '3840x1600', 'https://www.dell.com/en-us/work/shop/dell-ultrasharp-38-curved-monitor-u3818dw/apd/210-AMRC/monitors-monitor-accessories'),
            DELL_U3419W: new Display('Dell U3419W', 34, ASPECT_21_9, '3440x1440', 'https://www.dell.com/en-us/work/shop/dell-ultrasharp-34-curved-usb-c-monitor-u3419w/apd/210-ARCL/monitors-monitor-accessories'),
            DELL_U3219Q: new Display('Dell U3219Q', 32, ASPECT_16_9, '3840x2160', 'https://www.dell.com/en-us/work/shop/dell-ultrasharp-32-4k-usb-c-monitor-u3219q/apd/210-aqzz/monitors-monitor-accessories'),
            DELL_U2720Q: new Display('Dell U2720Q', 27, ASPECT_16_9, '3840x2160','https://www.dell.com/en-us/work/shop/ultrasharp-27-4k-usb-c-monitor-u2720q/apd/210-avjv/monitors-monitor-accessories' ),
            DELL_U2713HM: new Display('Dell U2713HM', 27, ASPECT_16_9, '2560x1440', 'https://www.dell.com/hr/p/dell-u2713hm/pd'),
            LENOVO_X1: new Display('X1 Carbon', 14, ASPECT_16_9, '1920x1080'),
            LG_34WK95U: new Display('LG 34WK95U-W', 34, ASPECT_21_9, '5120x2160', 'https://www.lg.com/us/monitors/lg-34WK95U-W-ultrawide-monitor'),
            LG_34WN80C: new Display('LG 34WN80C-B', 34, ASPECT_21_9, '3440x1440', 'https://www.lg.com/us/monitors/lg-34wn80c-b-ultrawide-monitor'),
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
            MONITORS.DELL_U2713HM,
            MONITORS.DELL_U2720Q,
            MONITORS.DELL_U3419W,
            MONITORS.DELL_U4919DW,
            MONITORS.DELL_U3219Q,
            MONITORS.DELL_U3818DW,
            MONITORS.LG_34WK95U,
            MONITORS.LG_34WN80C,
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
            '#3498db',
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
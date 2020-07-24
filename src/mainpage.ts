$(function (): void {
  $('.icon').on('mouseenter mouseleave', function (): void {
    const currentId = this.id;
    const $reqs = $('.' + currentId + '');
    const $el = $reqs.eq(0);
    const $el1 = $reqs.eq(1);
    $el.toggleClass('icon_hover');
    $el1.toggleClass('name_hover');
  });

  $('.name').on('mouseenter mouseleave', function (): void {
    const currentId = this.id;
    const $reqs = $('.' + currentId + '');
    const $el = $reqs.eq(0);
    const $el1 = $reqs.eq(1);
    $el.toggleClass('icon_hover');
    $el1.toggleClass('name_hover');
  });
});

class TxtRotate {
  private readonly toRotate: string[];
  private el: any;
  private loopNum: number;
  private readonly period: number;
  private txt: string;
  private isDeleting: boolean;

  constructor(el: HTMLElement, toRotate: string[], period: string) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
  }

  public start(): void {
    this.tick();
    this.isDeleting = false;
  }

  private tick(): void {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let delta = 150 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

window.onload = function (): void {
  const elements: HTMLCollectionOf<any> = document.getElementsByClassName('txt-rotate');
  // @ts-ignore
  for (const element of elements) {
    const toRotate = element.getAttribute('data-rotate');
    const period = element.getAttribute('data-period');
    if (toRotate) {
      const rotatable: TxtRotate = new TxtRotate(element, JSON.parse(toRotate), period);
      rotatable.start();
    }
  }
};

import { SnakeAngular2Page } from './app.po';

describe('snake-angular2 App', function() {
  let page: SnakeAngular2Page;

  beforeEach(() => {
    page = new SnakeAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

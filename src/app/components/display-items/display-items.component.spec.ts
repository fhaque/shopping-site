import { DisplayItemsComponent } from './display-items.component';
import { id } from '../../models/items.model';

class MockRedux {
  dispatch = () => {};
  select = () => {}; 
}

class MockShoppingCartActions {
  addItem = (id: id) => ( {id} );
}

describe('DisplayItemsComponent', () => {
  let component: DisplayItemsComponent;
  let mockRedux: MockRedux;
  let mockShoppingCartActions:  MockShoppingCartActions;

  beforeEach(() => {
    mockRedux = new MockRedux;
    mockShoppingCartActions = new MockShoppingCartActions;
  
    component = new DisplayItemsComponent(
      mockRedux as any, 
      mockShoppingCartActions as any
    );
  });

  it('should dispatch for add item to cart', () => {
    const id: id = "cheese";

    spyOn(mockShoppingCartActions, 'addItem');
    spyOn(mockRedux, 'dispatch');

    component.addToCart(id);
    expect( mockShoppingCartActions.addItem ).toHaveBeenCalledWith(id);
    expect( mockRedux.dispatch )
      .toHaveBeenCalledWith( mockShoppingCartActions.addItem(id) );
  });

});

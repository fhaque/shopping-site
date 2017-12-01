import { FilterComponent } from './filter.component';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { FilterActions } from '../../actions/filter.actions';

class MockRedux {
  dispatch = () => {};
  select = () => {}; 
}

class MockFilterActions {
  setFilter = () => {};
  clearFilters = () => ({type: ''});
}


describe('FilterComponent class', () => {
  let component: FilterComponent;
  let mockRedux: MockRedux;
  let mockFilterActions: MockFilterActions;


  beforeEach( () => {
    mockRedux = new MockRedux;
    mockFilterActions = new MockFilterActions;

    component = new FilterComponent(mockRedux as any, mockFilterActions as any);
  });

  it('dispatches a Clear Filer action', () => {
    spyOn(mockRedux, 'dispatch');
    spyOn(mockFilterActions, 'clearFilters');
    component.clearFilters();
    expect( mockFilterActions.clearFilters ).toHaveBeenCalled();
    expect( mockRedux.dispatch ).toHaveBeenCalled();
  });



});

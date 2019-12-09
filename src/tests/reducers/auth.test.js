import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
    const uid = '1';
    const action = {
        type: 'LOGIN',
        uid: uid
    };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
        uid: uid
    });
});

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: '2' }, action);
    expect(state).toEqual({});
});
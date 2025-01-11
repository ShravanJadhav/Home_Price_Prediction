import json
import pickle
import numpy as np

# global variable 

__location = None
__data_columns = None
__model = None

def get_estinated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x1 =np.zeros(len(__data_columns))
    x1[0]=sqft
    x1[1]=bath
    x1[2]=bhk

    if loc_index >=0:
        x1[loc_index]=1
    
    return round(__model.predict([x1])[0],2)


def get_location_names():
    return __location

def load_saved_artifacts():
    print('Loading Saved Artifacts ... start')
    global __data_columns
    global __location
    

    with open(r"server/artifacts/columns.json",'r')as f:
       __data_columns = json.load(f)['data_columns']
       __location = __data_columns[3:]

    global __model
    
    if __model is None:
        with open(r"server/artifacts/bengaluru_house_prices.pickle",'rb')as f:
            __model = pickle.load(f)

    print('Loading saved artifacts... done')

def get_location_names():
    return __location

def get_data_columns():
    return __data_columns


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estinated_price('1st block jayanagar',1000,3,3))
    print(get_estinated_price('1st phase jp nagar',1000,2,3))
    print(get_estinated_price('Kalhalli',1000,3,3))
    print(get_estinated_price('2ABC',1000,3,3))

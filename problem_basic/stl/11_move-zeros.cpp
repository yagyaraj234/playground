#include<iostream>
#include<vector>
using namespace std;



void moveZeros(vector<int>* v){

    int it = 0;
    int i = 1;

    while(i <v->size()){
        if((*v)[it] != 0){
            it++;
            continue;
        }else if ((*v)[i] == 0){
            i++;
            continue;
        }

        if ((*v)[it] == 0 && (*v)[i] != 0 ){
            swap((*v)[it], (*v)[i]);
            it++;
            i++;
        }
        }

}

int main(){

    vector<int> v = {0,1, 2, 4, 0, 5, 3, 2, 0, 53, 3, 0, 53};

    // 1,2,4,5,3,2,53,3,53

    cout << "lenght of vector before: " << v.size()<<endl;

    moveZeros(&v);

    for (int i :v){
        cout << " " << i;
    }

    cout << endl;

    cout << "lenght of vector after: " << v.size()<<endl;

return 0;
}
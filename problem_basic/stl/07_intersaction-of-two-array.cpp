#include<iostream>
#include<set>
#include<vector>
#include<algorithm>
#include<unordered_set>

using namespace std;

set<int> intersactionOfArr(vector<int> v1,vector<int> v2){

    set<int> result;
    unordered_set<int> us(v1.begin(),v1.end());

    for (int x : v2){
        if(us.count(x)){
            result.insert(x);
        }
    }

    return result;

}

// [1,2,2,1], [2,2]
int main(){

    vector<int> v1 = {1, 2, 2, 1,43,5,2,53,5,2,1,4,232,5,3};
    vector<int> v2 = {2, 2, 3};

    set<int> result = intersactionOfArr(v1, v2);

    for (int x:result){
        cout << x << " ";
    }

    return 0;
}
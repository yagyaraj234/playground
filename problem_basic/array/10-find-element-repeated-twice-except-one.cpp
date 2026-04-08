#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

// Problem:
// There is an array with every element repeated twice except one.
// Find that element.
//
int findUniqueEl(vector<int> v){
    unordered_map<int, int> ump;

    for(int a:v){
        ump[a]++;
    }

    for(auto it:ump){
        if(it.second ==1){
            return it.first;
        }
    }
    return 0;
}

int main() {
    vector<int> v={1,2,3,4,5,6,7,7,2,1,6,5,3};

    int result = findUniqueEl(v);
    cout<<result;
    return 0;
}

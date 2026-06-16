#include <algorithm>
#include <iostream>
#include <unordered_set>
#include <vector>
using namespace std;

// Problem: Write a program to remove duplicates from array in cpp.
//
vector<int> removeDuplicated(vector<int> v){
    unordered_set<int> us(v.begin(),v.end());
    vector<int> result;

    for(int it:us){
        result.push_back(it);
    }

    return  result;
}

int main() {
    vector<int> arr = {1,3,3,3,5,2,535,625,5,4,14,4,12,14,3,42};
    vector<int> result = removeDuplicated(arr);
    sort(result.begin(),result.end());
    for(auto it:result){
        cout<<it<<" ";
    }
    cout<<endl;
    return 0;
}

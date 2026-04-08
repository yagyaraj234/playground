#include <algorithm>
#include <iostream>
#include <unordered_map>
#include <vector>
using namespace std;

// Problem: Write a program to find intersection of two sorted arrays in cpp.

void print(vector<int> v){
    for(int a:v){
        cout<<a<<" ";
    }
    cout<<endl;
}
vector<int> findIntersection(vector<int> a,vector<int> b){

    unordered_map<int, int> ump;
    vector<int> ans;

    if(a.empty() || b.empty()){
        return ans;
    }

    for(int i:a){
        ump.insert({i,i});
    }

    for(int it:b){
        if(ump.count(it)){
            ans.push_back(it);
            ump.erase(it);
        }
    }

    return ans;
}

int main() {

    vector<int> v={3,4,2,5,256,3,6,2,654,5,7,3,4};
    vector<int> v2={3,4,1,6,7,2,5,7,2,4,66,3};


    sort(v.begin(),v.end());
    sort(v2.begin(),v2.end());
    vector<int> result = findIntersection(v, v2);


    print(result);

    return 0;
}

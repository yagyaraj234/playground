#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> mergeTwoSortedArray(vector<int> v1, vector<int> v2)
{

    vector<int> v;

    //  using algorims
    // merge(v1.begin(), v1.end(),v2.begin(),  v2.end(), v.begin());


    // using two pointer approach

    int index1 = 0;
    int index2 = 0;

    while ( index1 < v1.size() && index2 < v2.size()){
        if(v1[index1] < v2[index2]){
            v.push_back(v1[index1]);
            index1++;
        }else{
            v.push_back(v2[index2]);
            index2++;
        }
    }

    while(index1<v1.size()){
        v.push_back(v1[index1]);
        index1++;
    }

    while(index2 < v2.size()){
        v.push_back(v2[index2]);
        index2++;
    }


        return v;
}

int main()
{
    vector<int> v1 = {1, 2, 3};
    vector<int> v2 = {2, 5, 6};

    vector<int> result = mergeTwoSortedArray(v1, v2);

    for (int i : result){
        cout << i << " ";
    }

    return 0;
}